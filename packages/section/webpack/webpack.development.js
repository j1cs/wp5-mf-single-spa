const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const webpackBaseConfig = require('./webpack.config');
const { BUILD_DIR, includePathFromSrc } = require('./paths');

const { PORT, HOST } = process.env;

const webpackDevelopment = merge(webpackBaseConfig, {
  entry: {
    app: ['core-js/stable', 'regenerator-runtime/runtime', includePathFromSrc('index.ts')],
  },

  output: {
    publicPath: `http://${HOST}:${PORT}/`,
  },

  mode: 'development',

  devtool: 'eval-cheap-source-map',

  cache: {
    type: 'memory',
  },

  performance: {
    hints: false,
  },

  devServer: {
    historyApiFallback: true,
    static: { directory: BUILD_DIR },
    port: PORT,
    host: HOST,
    compress: true,
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

    new webpack.HotModuleReplacementPlugin(),

    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
  ],
});

module.exports = webpackDevelopment;
