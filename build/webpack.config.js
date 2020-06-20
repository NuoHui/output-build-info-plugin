const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    app: resolve("src/index.js")
  },
  output: {
    path: resolve("dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: "babel-loader",
        include: [resolve("src")]
      }
    ]
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@src": resolve("src")
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        sourceMap: false,
        parallel: true,
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          output: {
            ecma: 5,
            comments: false
          }
        }
      })
    ]
  }
};
