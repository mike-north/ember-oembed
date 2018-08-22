import { xmlOembedParser, jsonOembedParser } from 'ember-oembed/utils/oembed-parser';
import { suite, test } from 'qunit-decorators';

@suite('Unit | Utility | oembed-parser')
export class OembedParserTest {
  // Replace this with your real tests.
  @test
  'it works'(assert: Assert) {
    assert.ok(xmlOembedParser);
    assert.equal(typeof xmlOembedParser.parse, 'function', 'parse method is implemented');
  }
  @test
  'jsonOembedParser - it works'(assert: Assert) {
    assert.ok(jsonOembedParser);
    assert.equal(typeof jsonOembedParser.parse, 'function', 'parse method is implemented');
  }
}
