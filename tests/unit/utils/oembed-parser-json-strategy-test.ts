import oembedParserJsonStrategy from 'ember-oembed/utils/oembed-parser-json-strategy';
import { suite, test } from 'qunit-decorators';

@suite('Unit | Utility | oembed-parser-json-strategy')
export class OembedParserJsonStrategyTest {
  // Replace this with your real tests.
  @test
  'it works'(assert: Assert) {
    assert.ok(oembedParserJsonStrategy);
    assert.equal(typeof oembedParserJsonStrategy, 'function', 'oembedParserJsonStrategy is a function');
  }
}
