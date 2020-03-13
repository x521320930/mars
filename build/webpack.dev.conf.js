const path = require('path')
const utils = require('./utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const DotenvWebpack = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
process.env.NODE_ENV = 'development'

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8]].js',
    publicPath: config.dev.assetsPublicPath
  },
  
  module: {
    rules: utils.styleLoaders({ sourceMap: true, usePostCSS: true })
  },
  devtool: config.dev.devtool,

  devServer: {
    // 运行代码的目录
    // contentBase: path.join(__dirname, "dist"),
    // publicPath: './',
    // 开启此选项后，在文件修改之后，会触发一次完整的页面重载。
    // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload 重新刷新页面
    watchContentBase: true,
    // https://webpack.docschina.org/configuration/watch
    watchOptions: {
      // 这个选项可以排除一些巨大的文件夹 忽略文件
      ignored: /node_modules/
      // poll: true
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 8088,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: config.dev.open,
    // 开启HMR功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'warning',
    // 除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错了，不要全屏提示~
    overlay: {
      warnings: true,
      errors: true
    },
    // 代理
    proxy: config.dev.proxyTable,
    historyApiFallback: true
  },
  plugins: [
    new DotenvWebpack({
      path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      eslint: true
    }),
    ...utils.htmlPlugins()
  ],
  /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSize: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunk最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: {
        // 分割chunk的组
        // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
        // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10,
          name: 'vendor'
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true
        } 
      }
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime`
    }
  }
})

module.exports = devWebpackConfig

