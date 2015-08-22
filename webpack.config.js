var Path = require('path');
module.exports = {
    entry: Path.join(__dirname, 'src','main.js'),
    output: {
        path: Path.join(__dirname, 'web', 'js'),
        publicPath: 'js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: Path.join(__dirname, 'src'),
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:{
                    optional:["spec.protoToAssign"]
                }
            }
        ]
    },
    devServer: {
        contentBase: Path.join(__dirname,'web')
    }
};