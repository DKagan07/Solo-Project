const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: [
        './client/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'bundle.js',
        publicPath: '/',
        clean: true,
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env', '@babel/react']
                } 
            }
        },
        // this is eventually for css/sass
        // {test:}
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html',
        })
    ],
    devServer: {
        port: 8080,
        host: 'localhost',
        static: {
            publicPath: '/',
            directory: path.resolve(__dirname, 'bundle'),
        },
        hot: true,
        // proxy: {
        //     '/': {
        //         target: 'http://localhost:4321',
        //         secure: false,
        //     }
        // },
    },
}