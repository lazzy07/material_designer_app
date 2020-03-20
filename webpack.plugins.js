const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin({async: true}),
  new CopyWebpackPlugin([{from: "public/dependencies", to: "main_window/dependencies"}])
];
