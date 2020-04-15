module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // 按需加载
        useBuiltIns: 'usage',
        // 指定core-js版本
        corejs: {
          version: 3,
        },
        // 指定兼容性做到哪个版本浏览器
        targets: {
          chrome: '60',
          firefox: '60',
          ie: '11',
          safari: '10',
          edge: '17',
        }
      }
    ]
  ]
};
