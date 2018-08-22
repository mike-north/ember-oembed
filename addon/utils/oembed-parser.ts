import oEmbedParserXmlStrategy from './oembed-parser-xml-strategy';
import oEmbedParserJsonStrategy from './oembed-parser-json-strategy';
import { Object as JSONObject } from 'json-typescript';

class OEmbedParser {
  constructor(protected strategy: (doc: JSONObject | XMLDocument) => void) {}
  parse(x: JSONObject | XMLDocument) {
    return this.strategy(x);
  }
}

const xmlOembedParser = new OEmbedParser(oEmbedParserXmlStrategy);
const jsonOembedParser = new OEmbedParser(oEmbedParserJsonStrategy);

export { xmlOembedParser, jsonOembedParser };
