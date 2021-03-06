/*
 * @Author: xin.song 
 * @Date: 2018-07-07 18:47:38 
 * @Last Modified by:   xin.song 
 * @Last Modified time: 2018-07-16 10:47:38 
 */
const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');


const webpackConfigDev = {
	mode: 'development', // 通过 mode 声明开发环境
	output: {
		path: path.resolve(__dirname, '../dist/'),
		// 打包多出口文件
		// 生成 a.bundle.[hash].js  b.bundle.[hash].js
		filename: './js/[name].[hash:5].js',
		publicPath: '/dist',

	},
	// watch: true,
	// watchOptions: {
	// 	ignored: /node_modules/,
	// 	aggregateTimeout: 300,
	// 	poll: 1
	// },
	devServer: {
		contentBase: path.join(__dirname, "../"),
		publicPath: '/',
		host: "127.0.0.1",
		port: "8089",
		inline: true,//自用刷新
		overlay: true, // 浏览器页面上显示错误
		// open: true, // 开启浏览器
		// stats: "errors-only", //stats: "errors-only"表示只打印错误：
		hot: false // 开启热更新
	},
	plugins: [
		//热更新
		// new webpack.HotModuleReplacementPlugin(),
	],
	// devtool: "source-map",  // 开启调试模式
	module: {
		rules: []
	},
}
module.exports = merge(webpackConfigBase, webpackConfigDev);