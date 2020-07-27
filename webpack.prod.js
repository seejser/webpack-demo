/*
 * @Author:dapeng
 * @Date: 2020-07-27 11:22:07
 * @LastEditTime: 2020-07-27 13:16:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack-demo/webpack.prod.js
 */ 
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
    // 方便追踪源代码错误
    //（如果不需要3.2小节的追踪功能，可以注释掉下行代码）
   // devtool: 'source-map'
})
