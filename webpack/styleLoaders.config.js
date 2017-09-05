/**
 * Created by cyc on 2017/2/9.
 */

const
  path = require('path')
  , PRODUCTION = process.env.NODE_ENV === 'production'       // 生产模式
;


let
  cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]__[local]'
;


module.exports = options => {
  return Object.assign({
    cssLoader: {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        modules: true,
        localIdentName: cssIdentifier,
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
        outputStyle: 'expanded',
      },
    },
  }, options);
};