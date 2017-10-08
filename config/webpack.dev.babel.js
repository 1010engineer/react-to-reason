const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: "./src/index.js",
  devtool: "eval",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader") },
      {
        test: /\.(re|ml)$/,
        loader: "bs-loader"
      }
    ]
  },
  resolve: {
    extensions: [".re", ".ml", ".js"]
  },
  plugins: [HtmlWebpackPluginConfig, new ExtractTextPlugin("[name].css")]
};
