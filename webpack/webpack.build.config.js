const
  path = require('path')
  , webpack = require('webpack')
  , webpackMerge = require('webpack-merge')
  , webpackBase = require('./webpack.base.js')
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


let
  imageWebpackLoaderConfig = {
    loader: 'image-webpack-loader',
    options: {
      query: {
        mozjpeg: {
          progressive: true,
          quality: 65,
        },
        gifsicle: {
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 6,
        },
        pngquant: {
          quality: '65-90',
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              removeViewBox: false
            },
            {
              removeEmptyAttrs: false
            }
          ]
        },
      },
    }
  }
;

module.exports = webpackMerge(webpackBase, {
  bail: true,

  output: {
    path: path.resolve('build'),
  },

  module: {
    rules: [
      // Style
      {
        test: /\.scss$/,
        exclude: [
          path.resolve('node_modules'),
        ],
        include: [
          path.resolve('app'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',  // fix images url bug
          use: [
            styleLoadersConfig.cssLoader,
            styleLoadersConfig.postLoader,
            styleLoadersConfig.sassLoader,
          ],
        })
      },

      // Pictures
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [
          path.resolve('node_modules'),
          path.resolve('static', 'images', 'icons'),
          path.resolve('static', 'images', 'logos'),
          path.resolve('static', 'images', 'noUrl'),
        ],
        include: [
          path.resolve('app'),
          path.resolve('static'),
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: 'images/[hash:12].[ext]',
              // name: 'images/[name].[ext]',
            }
          },
          imageWebpackLoaderConfig,
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [
          path.resolve('node_modules'),
        ],
        include: [
          path.resolve('static', 'images', 'noUrl'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash:12].[ext]',
              // name: 'images/[name].[ext]',
            }
          },
          imageWebpackLoaderConfig,
        ],
      },

      // media
      {
        test: /\.(wav|mp3|mpeg|mp4|webm|ogv|flv|ts)$/i,
        exclude: [
          path.resolve('node_modules'),
        ],
        include: [
          path.resolve('static', 'media'),
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: 'media/[hash:12].[ext]',
            }
          },
        ],
      },

      // Svg icons
      {
        test: /\.svg$/,
        exclude: [
          path.resolve('node_modules'),
        ],
        include: [
          path.resolve('static', 'images', 'icons')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/icons/[hash:12].[ext]',
            }
          }
        ],
      },

      // Font
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        exclude: [
          path.resolve('node_modules'),
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'fonts/[hash:12].[ext]',
            }
          }
        ],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./static', 'view', 'index.pug'),
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
      uglifyOptions: {
        ie8: false,
        ecma: 5,
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        },
        warnings: false,
        sourceMap: true
      }
    }),

    new ExtractTextPlugin({
      filename: 'style/[name].[chunkhash:8].min.css',
      ignoreOrder: true,
      allChunks: true,
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),

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