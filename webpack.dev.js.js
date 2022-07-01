const htmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/client/index.js'],
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
            use: ['style-loader', {
              loader: 'css-loader',
              options: {
                esModule: false
              }
            }, 'resolve-url-loader', 

            {
              loader: 'sass-loader',
              options: {
                sourceMap: true, 
              }
            }]
        },
        
        {
            test: /\.(png|jpg|gif)$/i,
            type: 'asset/resource'
          },


        ], 
    },
        plugins: [
            //add html plugin
            new htmlWebPackPlugin 
            ({template:"./src/client/index.html"})
            
        ], 
        mode: "development"
    
}