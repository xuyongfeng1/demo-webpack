// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
// 用NodeJS的Path命令，与使用Linux下的shell脚本命令相似。
// 引入path对象:
var path = require('path');
var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
//var node_modules = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //插件项
    //plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        app : path.resolve(__dirname,'public/js/app/app.js'),//demo 
        vendors: ['main'] // 其他库
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname,'public/js'),
        //filename: 'build.js'
        filename: '[name].js'
    },
    module: {
        //加载器配置  module.loaders 是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理：
        loaders: [
            //.css 文件使用 style-loader 和 less-loader 来处理
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "less-loader") },
            //{ test: /\.txt$/, loader: 'raw-loader' },
            { test: /\.js$/,loader: 'babel'}, 
            { test: /\.js$/,loader: 'babel-loader!jsx-loader?harmony'},
            { test: /\.less$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=../img/[name].[ext]'}
        ]
    },
    // 插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("../css/app.css"),
         // ExtractTextPlugin：分离CSS和JS文件
    ],

    // jQuery 直接在 html 中引入，然后在 webpack 中把它配置为全局即可。
    externals: {        
        jquery: 'window.$'
    },
    //其它解决方案配置
    resolve: {
        //查找module的话从这里开始查找
        root: path.resolve(__dirname,'public/'), //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.css', '.js', '.json', '.less', '.jsx'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            // jquery : 'js/base/jquery.min.js',//后续直接 require('AppStore') 即可
            // bootstrap : 'js/base/bootstrap.min.js',
            // owl: 'js/base/owl.carousel.min.js',
            // template : 'js/base/template.js',
            // templateConfig : 'js/base/template.config.js',
            //templateConfig : 'js/base/template.config.js',
            // base : 'js/base/base.js',
            //form : 'js/base/form.js', 
            // main : 'js/app/main.js', 
            main : 'js/app/main.js', 
            form : 'js/app/form.js',
            app  : 'js/app/app.js',    
            url  : 'js/app/url.js',    
            // jsbox : 'js/base/jsbox/jsbox.js',
            // swiper: 'js/base/swiper.min.js',
            // jsplayer: 'js/base/jsplayer/Jplayer.min.js'
            //uploader : 'js/base/dmuploader/dmuploader.min.js',
            //upFile : 'js/base/upfile.js',
            //lodash : 'js/base/lodash.js',
            //zepto : 'js/base/zepto.js',
            //AppAction : 'js/actions/AppAction.js'

            // zepto : 'js/base/zepto.min.js',
            // updataimg: 'js/base/updataimg.min.js',
            // preloadmin: 'js/base/preloadmin.min.js'


        }
    }
};