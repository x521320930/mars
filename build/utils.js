
const path = require('path')
const config = require('../config')
const glob = require('glob')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV !== 'development'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}
exports.cssLoaders = function (options) {
  options = options || {}
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    // 是否需要抽离css
    if (options.extract) {
      const MEP = {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      }
      return [MEP].concat(loaders)
    } else {
      return ['style-loader'].concat(loaders)
    }
  }
  return {
    css: generateLoaders(),
    scss: generateLoaders('sass'),
  }
}

exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

// 多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
const PAGE_PATH = path.resolve(__dirname, '../src/pages')
// 取所有文件
const PAGE_FILES = glob.sync(PAGE_PATH + '/*')
// 多入口
exports.entries = function () {
  const map = {}

  PAGE_FILES.forEach((filePath) => {
    const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf(''))
    map[filename] = filePath + '/main.ts'
  })

  return map
}

// 多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中

exports.htmlPlugins = function () {
  const templates = []

  PAGE_FILES.forEach((filePath) => {
    const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf(''))
    let html = {
      // 模板来源
      template: `${filePath}/index.html`,
      // 文件名称
      filename: `${filename}.html`,
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['runtime', 'vendor', filename],
      inject: true
    };
    if (process.env.NODE_ENV !== 'development') {
      html = merge(html, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    }
    templates.push(new HtmlWebpackPlugin(html))
  })
  return templates
}
