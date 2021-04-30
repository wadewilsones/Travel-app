const path = require ('path');
const webpack = require ('webpack');
const htmlWebPackPlugin = require('html-webpack-plugin');
const { library } = require('webpack');
module.exports = {
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Fox',
    },
    module: {
        rules: [
            //add babel rusles
        {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        
        // add scss loader
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }  

        ], 
    },
        plugins: [
            //add html plugin
            new htmlWebPackPlugin 
            ({template:"./src/client/index.html"})
            
        ], 
        mode: "development"
    
}