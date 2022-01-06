const { merge } = require("webpack-merge");
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
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        body: "body@http://localhost:3001/remoteEntry.js",
        section: "section@http://localhost:3002/remoteEntry.js",
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
