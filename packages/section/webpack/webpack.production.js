const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpackBaseConfig = require('./webpack.config');
const { includePathFromSrc } = require('./paths');

const { PUBLIC_PATH_PROD } = process.env;

const webpackProduction = merge(webpackBaseConfig, {
  entry: {
    app: includePathFromSrc('index.ts'),
  },

  output: {
    publicPath: PUBLIC_PATH_PROD,
  },

  mode: 'production',

  devtool: 'source-map',

  performance: {
    hints: 'warning',
    maxAssetSize: 200 * 1024, // 150 KiB
    maxEntrypointSize: 200 * 1024, // 150 KiB
  },

  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.tsx$|\.ts$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],

  optimization: {
    minimize: true,

    sideEffects: true,

    concatenateModules: true,

    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
});

module.exports = webpackProduction;
