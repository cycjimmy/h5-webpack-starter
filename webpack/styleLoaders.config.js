const path = require('path');
const PRODUCTION = process.env.NODE_ENV === 'production';
const cssIdentifier = PRODUCTION
  ? '[hash:base64:10]'
  : '[name]__[local]';

module.exports = options => {
  return Object.assign({
    cssLoader: {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        modules: {
          localIdentName: cssIdentifier,
        },
      },
    },
    postLoader: {
      loader: 'postcss-loader',
      options: {
        config: {
          path: path.resolve('webpack', 'postcss.config.js'),
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
  }, options);
};
