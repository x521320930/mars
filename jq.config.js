const NODE_ENV = process.env.NODE_ENV
const assetsDir = 'static'
module.exports = {
  // 基本路径
  publicPath: './',
  assetsDir: assetsDir,
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/dev-api': {
        target: `http://10.159.40.18:49000`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    
    // 更改下 source-map 方式
    config.when(NODE_ENV === 'development', config => config.devtool('cheap-eval-source-map'))

  },
  configureWebpack: (config) => {

  }
}