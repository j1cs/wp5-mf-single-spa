const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  output: {
    publicPath: "http://localhost:3004/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3004,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ["\\.vue$"],
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: "parcel",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./App": "./src/App.vue",
      },
      shared: require("./package.json").dependencies,
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false, // must config by dotenv
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
