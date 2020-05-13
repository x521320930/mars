module.exports = (api, options) => {

  api.chainWebpack(webpackConfig => {
    const isProd = process.env.NODE_ENV === 'production'
    const getAssetPath = require('../utils/getAssetPath')
    const {
      extract = isProd,
      sourceMap = false,
      loaderOptions = {}
    } = options.css || {}

    const filename = getAssetPath(
      options,
      `css/[name]${options.filenameHashing ? '.[contenthash:8]' : ''}.css`
    )

    const extractOptions = {
      filename,
      chunkFilename: filename
    }
    const cssPublicPath = '../'.repeat(
      extractOptions.filename
        .replace(/^\.[\/\\]/, '')
        .split(/[\/\\]/g)
        .length - 1
    )
    function createCSSRule (lang, test, loader, options) {
      const baseRule = webpackConfig.module.rule(lang).test(test)
      
      if (extract) {
        baseRule
          .use('extract-css-loader')
          .loader(require('mini-css-extract-plugin').loader)
          .options({
            hmr: !isProd,
            publicPath: cssPublicPath
          })
      } else {
        baseRule
          .use('style-loader')
          .loader(require.resolve('style-loader'))
          .options({ sourceMap })
      }
      baseRule
        .use('css-loader')
        .loader(require.resolve('css-loader'))
        .options({ sourceMap })

      baseRule
        .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options({ sourceMap })

      if (loader) {
        let resolvedLoader
        try {
          resolvedLoader = require.resolve(loader)
        } catch (error) {
          resolvedLoader = loader
        }
        baseRule
          .use(loader)
          .loader(resolvedLoader)
          .options(Object.assign({ sourceMap }, options))
      }
    }

    createCSSRule('css', /\.css$/)
    createCSSRule('scss', /\.scss$/, 'sass-loader')
  })
}