/**
 * Created by cyc on 2017/2/4.
 */

const
  path = require('path')
  , webpack = require('webpack')

  // Webpack Plugin
  , CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
  , DefinePlugin = require('webpack/lib/DefinePlugin')
;

const
  DEVELOPMENT = process.env.NODE_ENV === 'development'    // 开发模式
  , PRODUCTION = process.env.NODE_ENV === 'production'    // 生产模式
  , PRODUCTION_TEST_SERVER = process.env.NODE_ENV === 'production_test_server'    // 用测试服务器预览生产模式
;

module.exports = {
  entry: {
    'vendor': [
      'fastclick',
      'swiper',
    ],
    "main": path.resolve('app', 'main.js'),
  },

  output: {
    // path: 'dist',
    filename: DEVELOPMENT
      ? 'scripts/[name].bundle.[chunkhash:4].js'
      : 'scripts/[name].bundle.[chunkhash:8].min.js',
    chunkFilename: DEVELOPMENT
      ? 'scripts/[name].chunk.[chunkhash:4].js'
      : 'scripts/[name].chunk.[chunkhash:8].min.js',
    //publicPath: '/'
  },

  resolve: {
    modules: [
      path.resolve('app'),
      path.resolve('node_modules'),
      path.resolve('static'),
    ],
    'alias': {
      'fastclick': path.resolve('node_modules', 'fastclick', 'lib', 'fastclick.js'),
      'swiper': path.resolve('node_modules', 'swiper', 'dist', 'js', 'swiper.js'),
    },
    'extensions': ['.js']
  },

  module: {
    rules: [
      // Scripts
      {
        test: /\.js$/,
        include: path.resolve('app'),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      // Pug template
      {
        test: /\.pug$/,
        include: [
          path.resolve('app'),
          path.resolve('static'),
        ],
        exclude: /node_modules/,
        loader: 'pug-loader',
      },
    ]
  },

  plugins: [
    new CommonsChunkPlugin({
      names: ['main', 'vendor'],
      minChunks: Infinity,
    }),

    new DefinePlugin({
      DEVELOPMENT: JSON.stringify(DEVELOPMENT),
      PRODUCTION: JSON.stringify(PRODUCTION),
      PRODUCTION_TEST_SERVER: JSON.stringify(PRODUCTION_TEST_SERVER),
      TEST_SERVER_ADDRESS: '',
    }),
  ],
};