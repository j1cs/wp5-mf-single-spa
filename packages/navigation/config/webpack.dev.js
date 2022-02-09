const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;

const { APP_NAME, APP_PORT } = process.env;

const devConfig = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: APP_PORT || 3001,
    historyApiFallback: true,
  },
  plugins: [
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

module.exports = (env, argv) => merge(commonConfig(env, argv), devConfig);
