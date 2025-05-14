const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'game.bundle.js',
        assetModuleFilename: 'afbeeldingen/[name][ext]',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { 
                    from: 'src/afbeeldingen', 
                    to: 'afbeeldingen' 
                },
                { 
                    from: 'src/styles', 
                    to: 'styles' 
                }
            ]
        })
    ]
};