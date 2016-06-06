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
    defaultParams: {
    }
  },
  twitter: {
    regex: /twitter\.com\/[\w]+\/status\//g,
    providerUrl: 'https://publish.twitter.com/oembed',
    defaultParams: {
    }
  }
};
