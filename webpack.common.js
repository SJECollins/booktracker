const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/renderer/index.js",
    booklist: "./src/renderer/views/booklist.js",
    authorlist: "./src/renderer/views/authorlist.js",
    bookdetails: "./src/renderer/views/bookdetails.js",
    authordetails: "./src/renderer/views/authordetails.js",
    bookform: "./src/renderer/views/bookform.js",
    authorform: "./src/renderer/views/authorform.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  target: "electron-renderer",
};
