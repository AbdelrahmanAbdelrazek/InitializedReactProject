const merge = require("webpack-merge");
const common = require("./webpack.common");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "production",
  entry: {
    vendor: ["react", "react-dom", "@babel/polyfill"],
    common: "./src/index.js"
  },
  optimization: {
    nodeEnv: "production",
    mangleWasmImports: true,
    splitChunks: {
        cacheGroups: {
            vendor: {
                chunks: 'all',
                name: 'vendor',
                test: '/node_modules/'
            },
        }
    },
    minimizer: [
      new UglifyJsPlugin({
        /* your config */
      })
    ]
  },
  plugins: [new BundleAnalyzerPlugin()]
});
