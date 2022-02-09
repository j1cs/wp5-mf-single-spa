const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.join(__dirname, process.env.NODE_ENV ? `../.env.${process.env.NODE_ENV}` : "../.env"),
});

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
