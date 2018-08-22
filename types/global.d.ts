declare module 'ember-oembed/templates/*' {
  import hbs from 'htmlbars-inline-precompile';
  const tmpl: ReturnType<typeof hbs>;
  export default tmpl;
}

declare module 'fetch';
