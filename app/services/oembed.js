import Service from '@ember/service';
import config from '../config/environment';
import defaultProviders from 'ember-oembed/utils/default-providers';

function findProvider(url, providers) {
  for (let i in providers) {
    if (providers.hasOwnProperty(i)) {
      let prov = providers[i];
      if (prov.regex.test(url)) {
        return prov;
      }
    }
  }
}

export default Service.extend({
  _configProviderForUrl(url) {
    let c = config;
    if (!c.oembed || !c.oembed.providers) {
      return null;
    } else {
      return findProvider(url, c.oembed.providers);
    }
  },
  _defaultProviderForUrl(url) {
    return findProvider(url, defaultProviders);
  },
  providerForUrl(url) {
    return this._configProviderForUrl(url) || this._defaultProviderForUrl(url);
  }
});
