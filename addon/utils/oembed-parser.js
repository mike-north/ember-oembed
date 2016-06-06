import Ember from 'ember';
import oEmbedParserXmlStrategy from './oembed-parser-xml-strategy';
import oEmbedParserJsonStrategy from './oembed-parser-json-strategy';
const OEmbedParser = Ember.Object.extend({
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
