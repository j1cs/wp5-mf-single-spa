const { merge } = require("webpack-merge");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;

const { APP_URL, APP_NAME } = process.env;

const prodConfig = {
  mode: "production",
  output: {
    publicPath: APP_URL || "http://localhost:3001/",
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: APP_NAME || "navigation",
      filename: "remoteEntry.js",
      exposes: {
        "./NavBar": "./src/NavBar",
      },
      shared: [
        {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      ],
    }),
  ],
};

module.exports = (env, argv) => merge(commonConfig(env, argv), prodConfig);
