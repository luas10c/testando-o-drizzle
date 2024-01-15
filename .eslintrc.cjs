module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'prettier',
    'plugin:drizzle/all',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['prettier', 'drizzle', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
