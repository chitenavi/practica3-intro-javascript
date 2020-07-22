module.exports = {
  parser: 'babel-eslint',
  env: {
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    strict: 1,
    'no-console': 'off',
    'linebreak-style': ['error', 'windows'],
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'func-names': ['error', 'never'],
  },
}
