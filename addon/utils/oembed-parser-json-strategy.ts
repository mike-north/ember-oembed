import { Value as JSONValue } from 'json-typescript';

export default function oembedParserJsonStrategy(obj: JSONValue | XMLDocument) {
  return obj;
}
