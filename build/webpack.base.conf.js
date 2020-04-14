const { resolve } = require('path');
const utils = require('./utils');

module.exports = {
  context: resolve(__dirname, '../'),

  entry: utils.entries(),
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
    alias: {
      '@': resolve(__dirname, '../src')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    // 告诉 webpack 解析模块是去找哪个目录
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'eslint-loader',
        // 排除node_modules下的js文件
        exclude: [/node_modules/],
        // 只检查 src 下的文件
        include: [resolve(__dirname, '../src')],
        // 优先执行
        enforce: 'pre'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          /* 
           * babel缓存
           * cacheDirectory: true
           * --> 让第二次打包构建速度更快
           */
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'ts-loader',
            options: {
              // 禁用类型检查器-我们将使用fork插件
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          esModule: false,
          fallback: {
            loader: 'file-loader',
            options: {
              name: utils.assetsPath('imgs/[name].[hash:8].[ext]')
            }
          }
        }
      },
      {
        test: /\.(svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
            }
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: utils.assetsPath('media/[name].[hash:8].[ext]')
            }
          }
        }
      }
    ]
  }
}