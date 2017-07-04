/**
 * Created by cyc on 2017/2/9.
 */

const
  autoprefixer = require('autoprefixer')
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
      }
    },
    sassLoader: {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded',
      }
    },
  }, options);
};