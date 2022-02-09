const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const Dotenv = require("dotenv-webpack");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : "../.env"
  ),
});

const { APP_NAME, APP_URL, APP_PORT } = process.env;
const deps = require("./package.json").dependencies;
module.exports = (env, argv) => ({
  output: {
    publicPath: APP_URL || "http://localhost:3002/",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: APP_PORT || 3002,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new Dotenv({
      path: argv.mode ? `.env.${argv.mode}` : ".env",
    }),
    new ModuleFederationPlugin({
      name: APP_NAME || "body",
      filename: "remoteEntry.js",
      remotes: {
        parcel: "parcel@http://localhost:3004/remoteEntry.js",
      },
      exposes: {
        "./App": "./src/App",
      },
      shared: {
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
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
