import oembedParserXmlStrategy from 'ember-oembed/utils/oembed-parser-xml-strategy';
import { suite, test } from 'qunit-decorators';

@suite('Unit | Utility | oembed-parser-xml-strategy')
export class OembedParserXmlStrategyTest {
  // Replace this with your real tests.
  @test
  'it works'(assert: Assert) {
    assert.ok(oembedParserXmlStrategy);
    assert.equal(typeof oembedParserXmlStrategy, 'function', 'oembedParserXmlStrategy is a function');
  }
}
