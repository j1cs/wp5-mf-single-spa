const { merge } = require("webpack-merge");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;

const devConfig = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackTagsPlugin({
      tags: [
        "http://localhost:3001/remoteEntry.js",
        "http://localhost:3002/remoteEntry.js",
      ],
    }),
    new ModuleFederationPlugin({
      name: "root",
      library: { type: "var", name: "root" },
      filename: "remoteEntry.js",
      remotes: {
        navigation: "navigation",
        body: "body",
      },
      shared: [
        {
          ...deps,
        },
      ],
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
