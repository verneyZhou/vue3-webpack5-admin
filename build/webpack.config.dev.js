'use strict';

const webpack = require('webpack');
const {merge} = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config.base');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


module.exports = merge(baseConfig, {
    mode: 'development',
    target: 'web', // 告知 webpack 为目标(target)指定一个环境。默认值为 "browserslist"，如果没有找到 browserslist 的配置，则默认为 "web"
    devServer: {
        hot: true,
        // contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: '127.0.0.1',
        port: 8090,
        open: true,
        static: {
            directory: path.join(__dirname, 'dist'),
            publicPath: '/',
        },
        // publicPath: '/',
        // quiet: true,
        historyApiFallback: true,
        proxy: {
            context: ['/wapi','/adwapi'],
            target: 'https://youle.zhipin.com/',
            secure: false, // 默认情况下不接受将请求转发到https的api服务器上，如果希望支持，可以设置为false
            changeOrigin: true
        }
    },
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    entry: {
        main: './src/main.ts',
        // vendors: ['vue', 'vue-router']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name]_[chunkhash:8].js',
        chunkFilename: '[name]_[chunkhash:8]_chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'        
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve(__dirname, '../src/styles/variables.scss')
                            ]
                        }

                    }
                ]
            }
        ]
    },
    plugins: [
        
        new webpack.HotModuleReplacementPlugin(),
    ],
    cache: {      
        // 将缓存类型设置为文件系统      
        type: "filesystem",       
        buildDependencies: {        
            /* 将你的 config 添加为 buildDependency，           
               以便在改变 config 时获得缓存无效*/        
            config: [__filename],        
            /* 如果有其他的东西被构建依赖，           
               你可以在这里添加它们*/        
            /* 注意，webpack.config，           
               加载器和所有从你的配置中引用的模块都会被自动添加*/      
        },      
        // 指定缓存的版本      
        version: '1.0'     
    }
});
