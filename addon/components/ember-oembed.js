import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { scheduleOnce, debounce } from '@ember/runloop';
import { observer, computed } from '@ember/object';
import $ from 'jquery';
import layout from '../templates/components/ember-oembed';
import fetch from 'ember-network/fetch';
import {
  xmlOembedParser,
  jsonOembedParser
} from 'ember-oembed/utils/oembed-parser';

export default Component.extend({
  oembed: service(),
  classNames: ['ember-oembed'],
  layout,
  attributeBindings: ['_styleString:style'],

  init() {
    this._super(...arguments);
    this.set('style', this.attrs.style || {});
  },

  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, this._fetchContentMetaData);
  },
  provider: computed('src', function() {
    return this.get('oembed').providerForUrl(this.get('src'));
  }),

  providerUrl: computed('provider', function() {
    let provider = this.get('provider');
    return provider ? provider.providerUrl : null;
  }),

  providerParams: computed('provider', function() {
    let provider = this.get('provider');
    return provider ? provider.defaultParams : null;
  }),

  _styleString: computed('style', function() {
    let s = this.get('style');
    let sProps = [];
    for (let i in s) {
      if (s.hasOwnProperty(i)) {
        sProps.push([i, s[i]]);
      }
    }
    return sProps.map((x) => `${x[0]}: ${x[1]}`).join('; ');
  }),

  _updateContentMetaData: observer('_contentUrl', function() {
    debounce(this, this._fetchContentMetaData, 200);
  }),

  _contentUrl: computed('providerUrl', 'src', function() {
    let queryParams = JSON.parse(JSON.stringify(this.get('providerParams'))) || {};
    queryParams.url = this.get('src');
    let queryParamList = [];
    for (let k in queryParams) {
      if (queryParams.hasOwnProperty(k)) {
        queryParamList.push([k, queryParams[k]]);
      }
    }
    let queryString = queryParamList.length > 0 ? queryParamList.map((x) => {
      return `${x[0]}=${x[1]}`;
    }).join('&') : '';

    return `${this.get('providerUrl')}?${queryString}`;
  }),

  _fetchContentMetaData() {
    let yqlUrl = 'https://query.yahooapis.com/v1/public/yql';
    let body = {
      'q': `SELECT * FROM json WHERE url="${this.get('_contentUrl')}"`,
      'format': 'json',
      'jsonCompat': 'new'
    };
    fetch(`${yqlUrl}?${$.param(body)}`, {
      mode: 'cors'
    }).then((response) => {
      let [contentTypeHeader] = response.headers.map['content-type'];
      let isXml = contentTypeHeader.indexOf('application/xml') >= 0;
      if (isXml) {
        return response.text().then((responseBody) => {
          let xmlDoc = $.parseXML(responseBody);
          let [oEmbedNode] = $(xmlDoc).find('oembed');
          return xmlOembedParser.parse(oEmbedNode);
        });
      } else {
        let isJson = response.headers.map['content-type'][0].indexOf('application/json') >= 0;
        if (isJson) {
          return response.json().then((responseJson) => {
            return jsonOembedParser.parse((responseJson && responseJson.query && responseJson.query.results) ? responseJson.query.results.json : {});
          });
        }
      }
    }).then((data) => {
      if (!this.isDestroyed && !this.isDestroying) {
        this.set('_oembedData', data);
      }
    });
  }
});
