const
  path = require('path')
  , webpack = require('webpack')
  , webpackMerge = require('webpack-merge')
  , webpackBase = require("./webpack.base.js")
  , browserSyncConfig = require('./browserSync.config')
  , styleLoadersConfig = require('./styleLoaders.config')()

  // Webpack Plugin
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , DefinePlugin = require('webpack/lib/DefinePlugin')
  , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
  , LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , WebpackChunkHash = require("webpack-chunk-hash")
;


module.exports = webpackMerge(webpackBase, {
  bail: true,

  output: {
    path: path.resolve('./build'),
  },

  module: {
    rules: [
      // Style
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            styleLoadersConfig.cssLoader,
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: 'webpack/postcss.config.js'
                },
              },
            },
            styleLoadersConfig.sassLoader,
          ],
        })
      },
    ]
  },


  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('./static', 'view', 'index.pug'),
      //filename: '../index.html',
      favicon: path.resolve('./static', 'favicon.ico'),
      // chunks: ['manifest', 'main', 'vendor'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),

    new CleanWebpackPlugin(['build'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false,
    }),

    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // Uglify Js
    new UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        screw_ie8: true,
        warnings: false,
        drop_debugger: true,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true,
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true,
    }),

    new ExtractTextPlugin({
      filename: 'style/[name].[chunkhash:8].min.css',
      disable: false,
      allChunks: true,
    }),

    new BrowserSyncPlugin(browserSyncConfig({
      server: {
        baseDir: 'build',
        // https: true,
      },
      port: 4000,
      ui: {
        port: 4001,
      },
      logLevel: "warn",
    }), {
      reload: false,
    }),
  ],
});