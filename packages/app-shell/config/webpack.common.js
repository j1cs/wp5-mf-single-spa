const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (env, argv) => ({
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: argv.mode ? `.env.${argv.mode}` : ".env",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});
