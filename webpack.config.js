const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        signup: './src/signup.js',
        signup_business: './src/signup_business.js',
        login: './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/bundles'),
        filename: '[name].bundle.js'
    },
    watch: true
};