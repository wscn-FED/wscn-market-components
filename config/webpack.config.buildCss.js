var path = require('path');
var fs = require('fs');
var glob = require('glob');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var url = require('url');
var paths = require('./paths');

function getEntries() {
    var entryBasePath = paths.theme;
    var entryFiles = glob.sync(path.join(entryBasePath, '*.scss'))
    var entryObj = {};
    entryFiles.forEach(function (filePath) {
        var key = path.relative(entryBasePath, filePath);
        key = key.substring(0, key.lastIndexOf('.'));
        var entryArr = [filePath];
        entryObj[key] = entryArr;
    });
    return entryObj;
}

module.exports = {
    entry: getEntries(),
    output: {
        path: paths.appDist,
        filename: 'ignore/ignore.js',
    },

    resolveLoader: {
        root: paths.ownNodeModules,
        moduleTemplates: ['*-loader']
    },
    module: {
        loaders: [
            {
                test: /\.scss|\.css$/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true,
                except: ['$super', '$', 'exports', 'require']
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new ExtractTextPlugin('theme/[name].css')
    ]
};
