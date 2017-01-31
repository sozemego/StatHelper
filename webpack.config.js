/* eslint-disable */
var path = require("path");
var webpack = require("webpack");

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var entryPath = path.resolve(__dirname, "app");
var outputPath = path.resolve(__dirname, "public");

module.exports = {
    context: entryPath,
    entry: entryPath + "/app.js",
    debug: true,
    devtool: "sourcemaps",
    output: {
        path: outputPath,
        filename: "bundle.js",
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]")
						},
            {
                test: /\.js$/,
                //include: "./app/js/",
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
      new ExtractTextPlugin("css/main.css", {disable: false, allChunks: true}),
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
    resolve: {
      root: [
        path.resolve("./app")
      ]
    },
    node: {
      fs: "empty"
    }

};
