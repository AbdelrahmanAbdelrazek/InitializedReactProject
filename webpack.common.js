var path = require("path");

module.exports = {
  watch: true,
  output: {
    filename: "[name].min.js",
    chunkFilename: "[id].[hash].chunk.js",
    umdNamedDefine: true,
    publicPath: "js/dist/",
    path: path.resolve(__dirname, "www/js/dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /antd.*\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              // modifyVars: themeVariables
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
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
  }
};
