const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
    entry: {
      vendor: ["react", "react-dom", "@babel/polyfill"],
      common: "./src/index.js"
    },
    devtool: "inline-module-source-map",
    mode: "development"
  });
  