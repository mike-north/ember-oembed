import defaultProviders from 'ember-oembed/utils/default-providers';

export interface Provider {
  regex:
    | {
        pattern: string;
        flags?: string;
      }
    | RegExp;
  providerUrl: string;
  defaultParams: {
    format?: string;
    maxheight?: number;
  };
}

export interface PartialConfig {
  environment: string;
  oembed?: {
    providers?: { [k: string]: Readonly<Provider> };
  };
}

function findProvider(url: string, providers: { [k: string]: Readonly<Provider> }): Provider | null {
  for (let i in providers) {
    if (providers.hasOwnProperty(i)) {
      let prov = providers[i];
      let reg: RegExp;
      if (prov.regex instanceof RegExp) {
        reg = prov.regex;
      } else if (prov.regex.hasOwnProperty('pattern')) {
        if (prov.regex.hasOwnProperty('flags')) {
          reg = new RegExp(prov.regex.pattern, prov.regex.flags);
        } else {
          reg = new RegExp(prov.regex.pattern);
        }
      } else {
        throw new Error(`malformed Ember OAuth provider object ${JSON.stringify(prov)}`);
      }
      if (reg.test(url)) {
        return prov;
      }
    }
  }
  return null;
}

function configProviderForUrl(url: string, config: PartialConfig) {
  let c = config;
  if (!c.oembed || !c.oembed.providers) {
    return null;
  } else {
    return findProvider(url, c.oembed.providers);
  }
}

function defaultProviderForUrl(url: string) {
  return findProvider(url, defaultProviders);
}

export function providerForUrl(config: PartialConfig, url: string) {
  return configProviderForUrl(url, config) || defaultProviderForUrl(url);
}
