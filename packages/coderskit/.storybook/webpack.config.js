const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const babelConfig = require('./babel.config');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.ts(x?)$/,
    include: [path.resolve(__dirname, '..', 'src')],
    use: [
      {
        loader: 'babel-loader',
        options: babelConfig,
      },
    ],
  });
  config.resolve.plugins = config.resolve.plugins || [];
  config.resolve.plugins = [
    ...config.resolve.plugins,
    new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '..', 'tsconfig.json') }),
  ];
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
