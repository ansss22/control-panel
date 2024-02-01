const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "./app"),
    filename: "app.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./app"),
    },
    compress: true,
    port: 8081,
    open: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.(sass|css|scss)$/,

        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,

        exclude: /images/,

        use: [
          {
            loader: "file-loader",

            options: {
              name: "[name].[ext]",

              outputPath: "assets/fonts",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({}),

    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};
