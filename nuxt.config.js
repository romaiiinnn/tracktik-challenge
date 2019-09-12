const base = '/'

module.exports = {
  router: {
    base,
    routeNameSplitter: '/',
    middleware: 'authenticate'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'TrackTik Frontend Challenge',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'TrackTik Frontend Challenge' },
    ],
    link: [
      { href: 'favicon.ico', rel: 'icon', type: 'image/x-icon' },
    ],
    script: [
      {src: 'https://code.getmdl.io/1.3.0/material.min.js'},
    ],
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    // cache: true,
    // parallel: true,
    // hardSource: true,
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
}
