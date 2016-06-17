import Ember from 'ember';
import oEmbedParserXmlStrategy from './oembed-parser-xml-strategy';
import oEmbedParserJsonStrategy from './oembed-parser-json-strategy';

// jscs:disable disallowDirectPropertyAccess
const Obj = Ember.Object;
// jscs:enable disallowDirectPropertyAccess

const OEmbedParser = Obj.extend({
  parse(x) {
    return this.get('strategy')(x);
  }
});

const xmlOembedParser = OEmbedParser.create({
  strategy: oEmbedParserXmlStrategy
});

const jsonOembedParser = OEmbedParser.create({
  strategy: oEmbedParserJsonStrategy
});

export {
  xmlOembedParser,
  jsonOembedParser
};
