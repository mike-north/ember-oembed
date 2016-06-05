import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    'setup-example'(url) {
      this.set('url', url);
    }
  }
})
