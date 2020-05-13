module.exports = (api, options) => {

  api.chainWebpack(webpackConfig => {
    const isProd = process.env.NODE_ENV === 'production'
    const getAssetPath = require('../utils/getAssetPath')
    if (!options.pages) {
      webpackConfig
        .entry('app')
        .add('./src/main.ts')
    }
    const outputFilename = getAssetPath(
      options,
      `js/[name]${isProd && options.filenameHashing ? '.[contenthash:8]' : ''}.js`
    )
    webpackConfig
      .output
      .filename(outputFilename)
      .chunkFilename(outputFilename)
    webpackConfig
      .optimization.splitChunks({
        cacheGroups: {
          vendors: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      })
    const HTMLPlugin = require('html-webpack-plugin')
    const multiPageConfig = options.pages
    const htmlPath = api.resolve('public/index.html')
    const htmlOptions = {
      template: htmlPath,
      filename: 'index.html'
    }
    
    if (isProd) {
      Object.assign(htmlOptions, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        }
      })
    }
    if (!multiPageConfig) {
      webpackConfig
        .plugin('html')
        .use(HTMLPlugin, [htmlOptions])
    }
  })
}