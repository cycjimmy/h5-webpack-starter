/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const cssIdentifier = PRODUCTION
  ? '[hash:base64:10]'
  : '[name]__[local]';

module.exports = (options) => ({
  miniCssExtractLoader: {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
    },
  },
  cssLoader: {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: {
        localIdentName: cssIdentifier,
      },
      esModule: false,
    },
  },
  postLoader: {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: path.resolve('webpack', 'postcss.config.js'),
      },
    },
  },
  sassLoader: {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        outputStyle: 'expanded',
      },
    },
  },
  ...options,
});
