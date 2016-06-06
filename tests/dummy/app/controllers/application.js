import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['url'],
  url: '',
  actions: {
    'setup-example'(url) {
      this.set('url', url);
    }
  }
});
