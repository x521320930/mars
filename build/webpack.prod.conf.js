const path = require('path')
const utils = require('./utils')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack');
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const DotenvWebpack = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

process.env.NODE_ENV = process.argv[2]

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({ sourceMap: true, usePostCSS: true, extract: true })
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[contenthash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[contenthash:8]_chunk.js')
  },
  devtool: config.build.devtool,
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      // 如果为true，则插件将使用TypeScript 2.7中引入的增量编译API
      useTypescriptIncrementalApi: true,
      // 以MB为单位的服务进程的内存限制。如果服务存在分配失败错误。默认值:2048。
      memoryLimit: 4096
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: utils.assetsPath('css/[name]_[contenthash:8].css')
    }),
    // 要说css
    new OptimizeCssAssetsWebpackPlugin(),
    // 环境变量
    new DotenvWebpack({
      path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)
    }),
    // html
    ...utils.htmlPlugins(),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../src/dll/manifest.json')
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../src/dll/jquery.js'),
      hash: true,
      outputPath: utils.assetsPath('js'),
      publicPath: utils.assetsPath('js')
    }),
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
    },
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true
      })
    ]
  }
})


module.exports = prodWebpackConfig