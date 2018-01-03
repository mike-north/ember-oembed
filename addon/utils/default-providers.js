export default {
  soundcloud: {
    regex: /soundcloud\.com/g,
    providerUrl: 'http://soundcloud.com/oembed',
    defaultParams: {
      format: 'json',
      maxheight: 200
    }
  },
  'facebook-post': {
    regex: /facebook\.com\/[\w]+\/posts\//g,
    providerUrl: 'https://www.facebook.com/plugins/post/oembed.json',
    defaultParams: {}
  },
  flickr: {
    regex: /flickr\.com\/photos\//g,
    providerUrl: 'http://www.flickr.com/services/oembed/',
    defaultParams: {
      format: 'json'
    }
  },
  codepen: {
    regex: /codepen\.io\/[\w]+\/pen\/[\w]+/g,
    providerUrl: 'https://codepen.io/api/oembed',
    defaultParams: {
      format: 'json'
    }
  }
};
