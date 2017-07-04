const
  path = require('path')
  , webpackMerge = require('webpack-merge')
  , webpackBase = require("./webpack.base.js")
  , browserSyncConfig = require('./browserSync.config')
  , styleLoadersConfig = require('./styleLoaders.config')()

  // Webpack Plugin
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , DefinePlugin = require('webpack/lib/DefinePlugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
;

module.exports = webpackMerge(webpackBase, {
  devtool: 'eval-source-map',

  output: {
    path: path.resolve('./dist'),
  },

  module: {
    rules: [
      // Style
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          styleLoadersConfig.cssLoader,
          styleLoadersConfig.sassLoader,
        ]
      },
    ]
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),

    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false,
    }),

    new HtmlWebpackPlugin({
      //inject: true,
      template: path.resolve('static', 'view', 'index.pug'),
      favicon: path.resolve('static', 'favicon.ico'),
      //filename: '../index.html',
    }),

    new BrowserSyncPlugin(browserSyncConfig({
      server: {
        baseDir: 'dist',
      },
    }), {
      reload: true,
    }),

  ],
});