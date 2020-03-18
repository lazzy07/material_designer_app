const path = require('path');
const rules = require('./webpack.rules');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function srcPaths(src) {
    return path.join(__dirname, src);
}

module.exports = {
    mode: 'development',
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
        new CopyWebpackPlugin([{from: "public/loading", to: "loading"}])
    ]
};