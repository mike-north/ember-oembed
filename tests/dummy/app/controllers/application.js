import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['url'],
  url: '',
  actions: {
    'setup-example'(url) {
      this.set('url', url);
    }
  }
});
