const path = require('path');
const rules = require('./webpack.rules');
const plugins = require("./webpack.plugins");
const BUILD_ENV = require("./webpack.env").BUILD_ENV;

function srcPaths(src) {
    return path.join(__dirname, src);
}

module.exports = {
    mode: BUILD_ENV,
    target: 'electron-renderer',
    devtool: 'source-map',
    module: {
        rules
    },
    resolve: {
        alias: {
            '@main': srcPaths('src/main'),
            '@models': srcPaths('src/models'),
            '@renderer': srcPaths('src/renderer'),
            'react-dom': '@hot-loader/react-dom'
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    },
    plugins
};