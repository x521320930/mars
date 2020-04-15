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
    'postcss-pxtorem':{
      rootValue: 37.5,
      unitPrecision: 3,
      propList: ['*']
    },
    'cssnano': { // 4.0的用法
      'cssnano-preset-advanced': {
        zindex: false,
        autoprefixer: false
      }
    }
  }
};
