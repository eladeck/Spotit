const { path, resolve } = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "public")
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: resolve(__dirname, 'public', 'index.html'),
      filename: "./public/index.html"
    })
  ]
};
