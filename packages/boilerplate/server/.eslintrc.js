const merge = require('deepmerge');
const baseConfig = require('../../../.eslintrc');

module.exports = merge(baseConfig, {
  rules: {
    '@typescript-eslint/camelcase': 0,
  },
});
