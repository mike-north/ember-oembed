import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-oembed', 'Integration | Component | ember oembed', {
  integration: true
});

test('inline mode', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let done = assert.async();

  this.render(hbs`{{ember-oembed src='http://soundcloud.com/forss/flickermood'}}`);

  assert.equal(this.$().text().trim(), '');

  setTimeout(() => {
    done();
  }, 200);
});

test('block mode', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let done = assert.async();

  // Template block usage:
  this.render(hbs`
    {{#ember-oembed src='http://soundcloud.com/forss/flickermood' as |x|}}
      {{x.html}}
    {{/ember-oembed}}
  `);

  setTimeout(() => {
    assert.equal(this.$().text().trim(), '');
    done();
  }, 1000);
});
