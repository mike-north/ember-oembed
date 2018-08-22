import Application from '@ember/application';
import { PartialConfig, providerForUrl } from 'ember-oembed/utils/oembed';

export function makeInitializer(config: PartialConfig) {
  return {
    initialize(application: Application): void {
      application.register('ember-oembed:provider-for-url', providerForUrl.bind(null, config), { instantiate: false });
    }
  };
}
