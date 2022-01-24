const { merge } = require("webpack-merge");
var path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;

const { APP_NAME, NAVIGATION_APP, BODY_APP, SECTION_APP } = process.env;

const prodConfig = {
  mode: "production",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: APP_NAME || "root",
      filename: "remoteEntry.js",
      remotes: {
        navigation:
          NAVIGATION_APP || "navigation@http://localhost:3001/remoteEntry.js",
        body: BODY_APP || "body@http://localhost:3002/remoteEntry.js",
        section:
          SECTION_APP || "section@http://localhost:3003/js/remoteEntry.js",
      },
      shared: [
        {
          ...deps,
        },
      ],
    }),
  ],
};

module.exports = (env, argv) => merge(commonConfig(env, argv), prodConfig);
