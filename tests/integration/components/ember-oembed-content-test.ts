import { suite, test } from 'qunit-decorators';
import { EmberRenderingTest } from 'ember-qunit-decorators/test-support';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

@suite('Integration | Component | ember-oembed-content')
export class EmberOembedContentComponentTest extends EmberRenderingTest {
  @test
  async 'it renders when used in {{inline-form}}'(assert: Assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{ember-oembed-content}}`);

    assert.equal(('' + this.element.textContent).trim(), '');
  }

  @test
  async 'it renders when used in {{#block-form}}  {{/block-form}}'(assert: Assert) {
    // Template block usage:
    await render(hbs`
      {{#ember-oembed-content}}
        template block text
      {{/ember-oembed-content}}
    `);

    assert.equal(('' + this.element.textContent).trim(), 'template block text');
  }
}
