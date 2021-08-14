const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = [
  new MonacoWebpackPlugin({
    // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    languages: ["cpp"],
  }),
  new ForkTsCheckerWebpackPlugin({ async: true }),
  new CopyWebpackPlugin([
    {
      from: "public/dependencies",
      to: "main_window/dependencies",
      noErrorOnMissing: true,
    },
  ]),
];
