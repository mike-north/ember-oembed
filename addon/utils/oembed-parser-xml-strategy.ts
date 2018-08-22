export default function oembedParserXmlStrategy(doc: any) {
  let transformed: any = {};
  for (let i = 0; i < doc.childNodes.length; i++) {
    let n = doc.childNodes.item(i);
    if (n.nodeType === 1) {
      switch (n.getAttribute('type')) {
        case 'float':
          transformed[n.tagName] = parseFloat(n.textContent);
          break;
        case 'integer':
          transformed[n.tagName] = parseInt(n.textContent, 10);
          break;
        default:
          transformed[n.tagName] = n.textContent;
          break;
      }
    }
  }
  return transformed;
}
