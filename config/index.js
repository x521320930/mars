'use strict'
const path = require('path')

module.exports = {
  dev: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
    },
    useEslint: true,
    devtool: 'cheap-module-eval-source-map',
    cssSourceMap: false,
    open: false,
    dllPublicPath: './static/js',
    before: (app) => {
      // console.log(app)
    }
  },
  
  build: {
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    dllPublicPath: './static/js'
  }
}
