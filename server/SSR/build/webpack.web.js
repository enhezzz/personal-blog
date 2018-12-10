const merge = require('webpack-merge')
const baseConf = require('./webpack.base')
const path = require('path')
//设置ssr环境，为babel所用
process.env.ssr = true;
module.exports = merge(baseConf, {
    // mode: 'production',
    entry: ["@babel/polyfill",path.join(__dirname, '../client-entry.js')],
    target: 'web',
    output: {
        path: path.resolve(__dirname, '../js'),
        filename: 'app.bundle.js'
    }
})