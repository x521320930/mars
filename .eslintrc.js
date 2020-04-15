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
    'standard'
  ],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "func-names": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-underscore-dangle": ["error", { "allow": ["_this"] }],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/camelcase": "off",
    "camelcase": "off",
    "@typescript-eslint/no-explicit-any": "off",
  }
}