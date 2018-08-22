import Component from '@ember/component';
import { scheduleOnce, debounce } from '@ember/runloop';
import tmpl from 'ember-oembed/templates/components/ember-oembed';
import fetch from 'fetch';
import { xmlOembedParser, jsonOembedParser } from 'ember-oembed/utils/oembed-parser';
import { getOwner } from '@ember/application';
import { Object as JSONObject } from 'json-typescript';

import { computed } from '@ember-decorators/object';
import { layout, classNames } from '@ember-decorators/component';
import { Provider } from 'ember-oembed/utils/oembed';

@layout(tmpl)
@classNames('ember-oembed')
export default class EmberOembed extends Component {
  style!: JSONObject;
  src!: string;
  _updateContentMetaData: any;
  _oembedData?: any;
  constructor() {
    super(...arguments);
    if (typeof this.style === 'undefined') {
      this.style = {};
    }
    this.addObserver('_contentUrl', () => {
      debounce(this, '_fetchContentMetaData', 200);
    });
  }

  didInsertElement() {
    super.didInsertElement();
    scheduleOnce('afterRender', this, this._fetchContentMetaData);
  }

  @computed('src')
  get provider(): Provider {
    return getOwner(this).lookup('ember-oembed:provider-for-url')(this.get('src'));
  }

  @computed('provider')
  get providerUrl(): string | null {
    let provider = this.get('provider');
    return provider ? provider.providerUrl : null;
  }

  @computed('provider')
  get providerParams(): Provider['defaultParams'] | null {
    let provider = this.get('provider');
    return provider ? provider.defaultParams : null;
  }

  @computed('style')
  get _styleString() {
    let s: JSONObject = this.get('style');
    let sProps = [];
    for (let i in s) {
      if (s.hasOwnProperty(i)) {
        sProps.push([i, s[i]]);
      }
    }
    return sProps.map(x => `${x[0]}: ${x[1]}`).join('; ');
  }

  @computed('providerUrl', 'src')
  get _contentUrl() {
    let params: any = this.get('providerParams');
    let queryParams = JSON.parse(JSON.stringify(params)) || {};
    queryParams.url = this.get('src');
    let queryParamList = [];
    for (let k in queryParams) {
      if (queryParams.hasOwnProperty(k)) {
        queryParamList.push([k, queryParams[k]]);
      }
    }
    let queryString =
      queryParamList.length > 0
        ? queryParamList
            .map(x => {
              return `${x[0]}=${x[1]}`;
            })
            .join('&')
        : '';
    const url: string = this.get('providerUrl') || '';
    return `${url}?${queryString}`;
  }
  async _fetchContentMetaData() {
    let yqlUrl = 'https://query.yahooapis.com/v1/public/yql';
    let body = {
      q: `SELECT * FROM json WHERE url="${this.get('_contentUrl')}"`,
      format: 'json',
      jsonCompat: 'new'
    };
    let url = `${yqlUrl}?${$.param(body)}`;
    fetch(url, {
      mode: 'cors'
    })
      .then((response: Response & { headers: any }) => {
        let contentTypeHeader = response.headers.map['content-type'];
        let isXml = contentTypeHeader.indexOf('application/xml') >= 0;
        if (isXml) {
          return response.text().then(responseBody => {
            let xmlDoc = $.parseXML(responseBody);
            let [oEmbedNode] = $(xmlDoc).find('oembed');
            return xmlOembedParser.parse(oEmbedNode);
          });
        } else {
          let isJson = contentTypeHeader.indexOf('application/json') >= 0;
          if (isJson) {
            return response.json().then(responseJson => {
              return jsonOembedParser.parse(
                responseJson && responseJson.query && responseJson.query.results ? responseJson.query.results.json : {}
              );
            });
          } else return null;
        }
      })
      .then((data: JSONObject) => {
        if (!this.isDestroyed && !this.isDestroying) {
          this.set('_oembedData', data);
        }
      });
  }
}
