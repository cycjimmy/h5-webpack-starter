/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const { merge } = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const terserConfig = require('@cycjimmy/config-lib/cjs/terserWebpackPlugin/2.x/working').default;
const imageWebpackLoaderConfig = require('@cycjimmy/config-lib/cjs/imageWebpackLoader/8.x/production').default;
const styleLoadersConfig = require('./styleLoaders.config')();
const browserSyncConfig = require('./browserSync.config');
const webpackBase = require('./webpack.base');

module.exports = merge(webpackBase, {
  mode: 'production',
  bail: true,

  output: {
    path: path.resolve('build'),
  },

  module: {
    rules: [
      // Style
      {
        test: /\.scss$/,
        use: [
          styleLoadersConfig.miniCssExtractLoader,
          styleLoadersConfig.cssLoader,
          styleLoadersConfig.postLoader,
          styleLoadersConfig.sassLoader,
        ],
      },
      {
        test: /\.css$/,
        use: [
          styleLoadersConfig.miniCssExtractLoader,
          {
            loader: 'css-loader',
          },
        ],
      },

      // Pictures
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [
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
            },
          },
          imageWebpackLoaderConfig,
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: [
          path.resolve('static', 'images', 'noUrl'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash:12].[ext]',
              // name: 'images/[name].[ext]',
            },
          },
          imageWebpackLoaderConfig,
        ],
      },

      // Media
      {
        test: /\.(wav|mp3|mpeg|mp4|webm|ogv|flv|ts)$/i,
        include: [
          path.resolve('static', 'media'),
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: 'media/[hash:12].[ext]',
            },
          },
        ],
      },

      // Svg icons
      {
        test: /\.svg$/,
        include: [
          path.resolve('static', 'images', 'icons'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/icons/[hash:12].[ext]',
            },
          },
        ],
      },

      // Font
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'fonts/[hash:12].[ext]',
            },
          },
        ],
      },
    ],
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

    new MiniCssExtractPlugin({
      filename: 'style/[name].[chunkhash:8].min.css',
      ignoreOrder: false,
    }),

    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),

    new BrowserSyncPlugin(browserSyncConfig({
      server: {
        baseDir: 'build',
      },
      port: 4000,
      ui: {
        port: 4001,
      },
      logLevel: 'warn',
    }), {
      reload: false,
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      (compiler) => new TerserPlugin(terserConfig).apply(compiler),
      new CssMinimizerPlugin(),
    ],
  },
});
