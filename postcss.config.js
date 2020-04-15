module.exports = {
  ident: 'postcss',
  plugins: {
    'postcss-preset-env': {},
    'postcss-import': {},
    'postcss-url': {},
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': {
      utf8: false
    },
    'postcss-cssnext': {},
    'postcss-px-to-viewport': {
      viewportWidth: 375,     // (Number) 视窗的宽度，对应的是我们设计稿的宽度.
      viewportHeight: 667,    // (Number) 视窗的高度，根据750设备的宽度来指定
      unitPrecision: 3,       // (Number) 指定`px`转换为视窗单位值的小数位数
      viewportUnit: 'vw',     // (String) 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'],  // (Array)指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1,       // (Number) 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false
    },
    'cssnano': { // 4.0的用法
      'cssnano-preset-advanced': {
        zindex: false,
        autoprefixer: false
      }
    }
  },
};
