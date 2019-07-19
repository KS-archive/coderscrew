const merge = require('deepmerge');
const baseConfig = require('../../.eslintrc');

module.exports = merge(baseConfig, {
  extends: [
    'plugin:react/recommended',
  ],
  plugins: ['react'],
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-undef': 0,
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
