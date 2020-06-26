var path = require('path');

module.exports = {
    entry: './frontend/src/app.js',
    cache: true,
    mode: 'production',
    output: {
        path: __dirname,
        filename: './app/bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    }
};