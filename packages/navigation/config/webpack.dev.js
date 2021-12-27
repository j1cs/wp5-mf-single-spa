const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;

const devConfig = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "navigation",
      library: { type: "var", name: "navigation" },
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

module.exports = merge(commonConfig, devConfig);
