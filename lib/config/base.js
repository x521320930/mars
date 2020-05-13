
module.exports = (api, options) => {
  api.chainWebpack(webpackConfig => {
    const resolveLocal = require('../utils/resolveLocal')
    const getAssetPath = require('../utils/getAssetPath')
    const inlineLimit = 4096

    const genAssetSubPath = dir => {
      return getAssetPath(
        options,
        `${dir}/[name]${options.filenameHashing ? '.[hash:8]' : ''}.[ext]`
      )
    }

    const genUrlLoaderOptions = dir => {
      return {
        limit: inlineLimit,
        // use explicit fallback to avoid regression in url-loader>=1.1.0
        fallback: {
          loader: require.resolve('file-loader'),
          options: {
            name: genAssetSubPath(dir)
          }
        }
      }
    }
    webpackConfig.module
      .rule('eslint')
      .pre()
        .exclude
          .add(/node_modules/)
          .end()
      .test(/\.tsx?$/)
      .use('eslint-loader')
      .loader(require.resolve('eslint-loader'))
      
    webpackConfig
      .mode('development')
      .context(api.service.context)
    
    webpackConfig.output
      .path(api.resolve(options.outputDir))
      .filename('[name].js')
      .publicPath(options.publicPath)

    webpackConfig.resolve
      .extensions
        .merge(['.ts', '.tsx', '.js', '.jsx', '.json'])
        .end()
      .modules
        .add('node_modules')
        .add(api.resolve('node_modules'))
        .add(resolveLocal('node_modules'))
        .end()
      .alias
        .set('@', api.resolve('src'))

    webpackConfig.module
      .rule('tsx')
        .test(/\.tsx?$/)
        // babel缓存 cacheDirectory: true --> 让第二次打包构建速度更快
        .use('babel-loader')
          .loader(require.resolve('babel-loader'))
          .options({ cacheDirectory: true })
          .end()
        // 禁用类型检查器-我们将使用fork插件
        .use('ts-loader')
          .loader(require.resolve('ts-loader'))
          .options({ transpileOnly: true })

    
    webpackConfig.module
      .rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('url-loader')
          .loader(require.resolve('url-loader'))
          .options(genUrlLoaderOptions('img'))
    
    webpackConfig.module
      .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('file-loader')
          .loader(require.resolve('file-loader'))
          .options({
            name: genAssetSubPath('img')
          })

    webpackConfig.module
      .rule('media')
        .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
        .use('url-loader')
          .loader(require.resolve('url-loader'))
          .options(genUrlLoaderOptions('media'))

    webpackConfig.module
      .rule('fonts')
        .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
        .use('url-loader')
          .loader(require.resolve('url-loader'))
          .options(genUrlLoaderOptions('fonts'))

    webpackConfig.node
      .merge({
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // process is injected via DefinePlugin, although some 3rd party
        // libraries may require a mock to work properly (#934)
        process: 'mock',
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
      })
  })
}