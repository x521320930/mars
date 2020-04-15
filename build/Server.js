const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.dev.conf')

const compiler = Webpack(webpackConfig)

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  }
})
    

const server = new WebpackDevServer(compiler, devServerOptions)

server.listen(8088, '0.0.0.0', () => {
  console.log('Starting server on http://localhost:8088');
})