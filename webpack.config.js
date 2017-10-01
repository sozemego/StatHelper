const path = require("path");
const webpack = require("webpack");

const CopyWebpackPlugin = require('copy-webpack-plugin');

const entryPath = path.resolve(__dirname, "src");
const outputPath = path.resolve(__dirname, "dist");

module.exports = {
    context: entryPath,
    entry: entryPath + "/entry.js",
    devServer: {
        contentBase: outputPath,
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
	devtool: 'eval',
    output: {
        path: outputPath,
        filename: "entry.js"
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
        ],
        noParse: [/jszip.js$/]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: entryPath + "/*.html"
            },
			{
				from: entryPath + '/*.css'
			},
            {
                from: entryPath + "/img/*"
            }
        ])
    ],
    externals: [
        {
            './cptable': 'var cptable',
            '../xlsx.js': 'var _XLSX'
        }
    ],
    node: {
        fs: false,
        Buffer: false
    }
};
