const path = require('path')
const utils = require('./utils')
const DotenvWebpack = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const devWebpackConfig = {
  module: {
    rules: utils.styleLoaders({ sourceMap: true, usePostCSS: true })
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
}

module.exports = devWebpackConfig

