import { xmlOembedParser, jsonOembedParser } from 'ember-oembed/utils/oembed-parser';
import { module, test } from 'qunit';

module('Unit | Utility | oembed parser');

// Replace this with your real tests.
test('xmlOembedParser - it works', function(assert) {
  let result = xmlOembedParser;
  assert.ok(result);
  assert.equal(typeof result.parse, 'function', 'parse method is implemented');
});

test('jsonOembedParser - it works', function(assert) {
  let result = jsonOembedParser;
  assert.ok(result);
  assert.equal(typeof result.parse, 'function', 'parse method is implemented');
});
