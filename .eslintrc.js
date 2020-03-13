const path = require('path')

module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base'
  ],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "func-names": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-underscore-dangle": ["error", { "allow": ["_this"] }],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-this-alias": "off"
  }
}