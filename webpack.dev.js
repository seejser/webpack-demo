/*
 * @Author:dapeng
 * @Date: 2020-07-27 11:21:47
 * @LastEditTime: 2020-07-27 11:42:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-demo/webpack.dev.js
 */ 
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
    // 动态监测并实时更新页面
    devServer: {
        contentBase: './dist',
        // 默认端口8080，可不填
        port: 3038,
        // 热更新，无需刷新
        hot: true
    }
})
