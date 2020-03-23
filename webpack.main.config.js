const path = require('path');
const rules = require('./webpack.rules');
const BUILD_ENV = require("./webpack.env").BUILD_ENV;

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function srcPaths(src) {
    return path.join(__dirname, src);
}

module.exports = {
    mode: BUILD_ENV,
    devtool: 'source-map',
    target: 'electron-main',
    entry: './src/main/main.ts',
    module: {
        rules
    },
    resolve: {
        alias: {
            '@main': srcPaths('src/main'),
            '@models': srcPaths('src/models'),
            '@renderer': srcPaths('src/renderer'),
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    },
    plugins: [
        new CopyWebpackPlugin([{from: "public/loading", to: "loading"}, {from: "node_modules/7zip/7zip-lite", to: "7zip-lite"}]),
        new ForkTsCheckerWebpackPlugin({async: true})
    ]
};