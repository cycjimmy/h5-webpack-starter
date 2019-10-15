const
  path = require('path')

  // Webpack Plugin
  , DefinePlugin = require('webpack/lib/DefinePlugin')
  , {CleanWebpackPlugin} = require('clean-webpack-plugin')
;

const
  DEVELOPMENT = process.env.NODE_ENV === 'development'    // 开发模式
  , PRODUCTION = process.env.NODE_ENV === 'production'    // 生产模式
  , PRODUCTION_TEST_SERVER = process.env.NODE_ENV === 'production_test_server'    // 用测试服务器预览生产模式
;

module.exports = {
  entry: {
    'load': path.resolve('app', 'load.js'),
    // 'vendor': [],
    'main': [
      'fastclick',
      'swiper',
      path.resolve('app', 'main.js'),
    ],
  },

  output: {
    // path: 'dist',
    filename: DEVELOPMENT
      ? 'scripts/[name].bundle.[chunkhash:4].js'
      : 'scripts/[name].bundle.[chunkhash:8].min.js',
    chunkFilename: DEVELOPMENT
      ? 'scripts/[name].chunk.[chunkhash:4].js'
      : 'scripts/[name].chunk.[chunkhash:8].min.js',
    publicPath: './',
  },

  externals: {
    'fastclick': 'FastClick',
    'swiper': 'Swiper',
  },

  resolve: {
    modules: [
      path.resolve('app'),
      path.resolve('node_modules'),
      path.resolve('static'),
    ],
    'extensions': ['.js']
  },

  module: {
    rules: [
      // Web worker
      {
        test: /\.worker\.js$/,
        loader: 'worker-loader',
        options: {
          inline: true,
        },
      },

      // Scripts
      {
        test: /\.js$/,
        type: 'javascript/auto',
        loader: 'babel-loader',
      },

      // Pug template
      {
        test: /\.pug$/,
        include: [
          path.resolve('app'),
          path.resolve('static'),
        ],
        loader: 'pug-loader',
      },

      // ico
      {
        test: /\.ico$/i,
        include: [
          path.resolve('static'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },

      // expose
      {
        test: require.resolve('fastclick'),
        use: [{
          loader: 'expose-loader',
          options: 'Fastclick',
        }]
      },
      {
        test: require.resolve('swiper'),
        use: [{
          loader: 'expose-loader',
          options: 'Swiper',
        }]
      },
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      name: true,
      cacheGroups: {
        default: false,
        vendors: false,
        load: {
          name: 'load',
          chunks: 'initial',
          minSize: Infinity,
          minChunks: Infinity,
        },
      }
    },
    runtimeChunk: {
      name: 'load'
    }
  },

  plugins: [
    new DefinePlugin({
      DEVELOPMENT: JSON.stringify(DEVELOPMENT),
      PRODUCTION: JSON.stringify(PRODUCTION),
      PRODUCTION_TEST_SERVER: JSON.stringify(PRODUCTION_TEST_SERVER),
      TEST_SERVER_ADDRESS: '',
    }),

    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
  ],
};
