import Ember from 'ember';
import layout from '../templates/components/ember-oembed';
import fetch from 'ember-network/fetch';
import { xmlOembedParser, jsonOembedParser } from 'ember-oembed/utils/oembed-parser';

const { Component, computed, inject, run: { debounce, scheduleOnce }, observer } = Ember;

export default Component.extend({
  oembed: inject.service(),
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

  _fetchContentMetaData: function() {
    var yql_url = 'https://query.yahooapis.com/v1/public/yql';
    var url = 'http://myservice.com/data.json';
    fetch(this.get('_contentUrl'), {
      mode: 'cors',
      params: JSON.stringify(this.get('providerParams'))
    }).then((response) => {
      let isXml = response.headers.map['content-type'][0].indexOf('application/xml') >= 0;
      if (isXml) {
        return response.text().then((responseBody) => {
          let xmlDoc = Ember.$.parseXML(responseBody);
          let oEmbedNode = Ember.$(xmlDoc).find('oembed')[0];
          return xmlOembedParser.parse(oEmbedNode);
        });
      } else {
        let isJson = response.headers.map['content-type'][0].indexOf('application/json') >= 0;
        if (isJson) {
          return response.json().then((responseJson) => {
            return jsonOembedParser.parse(responseJson);
          });
        }
      }
    }).then((data) => {
      this.set('_oembedData', data);
    });
  }
});
