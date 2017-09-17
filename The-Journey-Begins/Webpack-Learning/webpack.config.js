const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
    entry: {
        app: [
            './src/main.js',
            './src/main.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    // use: [
                    //     {
                    //         loader: 'css-loader',
                    //         options: { url: false }
                    //     },
                    //     'sass-loader'
                    // ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader' ,'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.LoaderOptionsPlugin({
            minimize: process.env.NODE_ENV === 'production'
        }),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: process.env.NODE_ENV === 'production'
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}