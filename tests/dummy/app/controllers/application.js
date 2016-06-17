import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['url'],
  url: '',
  actions: {
    'setup-example'(url) {
      this.set('url', url);
    }
  }
});
