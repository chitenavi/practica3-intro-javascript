module.exports = {
  parser: 'babel-eslint',
  env: {
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    strict: 1,
    'prettier/prettier': ['error'],
    semi: ['error', 'never'],
    'no-console': 'off',
    'func-names': ['error', 'never'],
    'import/extensions': ['error', 'always'],
  },
}
