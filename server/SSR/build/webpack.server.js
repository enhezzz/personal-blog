const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const path = require('path')
//设置ssr环境，为babel所用
process.env.ssr = true;
module.exports = merge(baseConfig,{
    entry: ["@babel/polyfill",path.join(__dirname,'../server-entry.js')],
    target: 'node',
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs2'
    }
})
// module.exports = merge(baseConfig,{
//     entry: path.join(__dirname,'../src/server/createApp/client-side.js'),
//     target: 'web'
// })