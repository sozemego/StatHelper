const path = require("path");
const webpack = require("webpack");

const CopyWebpackPlugin = require('copy-webpack-plugin');

const entryPath = path.resolve(__dirname, "src");
const outputPath = path.resolve(__dirname, "dist");

module.exports = {
    context: entryPath,
    entry: entryPath + "/main.js",
    devServer: {
        contentBase: outputPath,
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    devtool: "source-map",
    output: {
        path: outputPath,
        filename: "bundle.js",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: entryPath + "/*.html"
            },
            {
                from: entryPath + "/img/*"
            }
        ])
        //new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.DefinePlugin({
        //	"process.env": {
        //		"NODE_ENV": JSON.stringify("production")
        //	}
        //}),
        //new webpack.optimize.UglifyJsPlugin({
        //	compressor: {
        //  	warnings: false
        //}
    ],
    node: {
        fs: "empty"
    }

};
