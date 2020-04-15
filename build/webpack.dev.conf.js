const path = require('path')
const utils = require('./utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const DotenvWebpack = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

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
    historyApiFallback: true,
    before: config.dev.before
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
  ]
})

module.exports = devWebpackConfig

