const path = require ('path');
const webpack = require ('webpack');
const htmlWebPackPlugin = require('html-webpack-plugin');
const { library } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizerWebpackPlugin = require ('css-minimizer-webpack-plugin');
const terserWebpackPlugin = require ('terser-webpack-plugin');
//service worker
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: ['./src/client/index.js'],
    optimization: {minimizer: [new terserWebpackPlugin({}), new cssMinimizerWebpackPlugin({})]},
    output: {
        libraryTarget: 'var',
        library: 'Fox',
    },
    module: {
        rules: [
            // add babel rusles
        {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
        },

        // add scss loader
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },        

        {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                },
              },
            ],
          },

      
        ], 
    },
        plugins: [
            //add html plugin
            new htmlWebPackPlugin 
            ({template:"./src/client/index.html"}),
            new MiniCssExtractPlugin ({filename: "[name].css"}),
            //add service worker
            new WorkboxPlugin.GenerateSW()
            
        ], 
        mode: "production"
    
}