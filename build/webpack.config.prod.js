'use strict';

const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin'); // 分离css
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const optimizeCss = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 优化和压缩 CSS
const TerserPlugin = require("terser-webpack-plugin"); // 压缩js
const utils = require('./utils');





const prodConfig = merge(baseConfig, {
    mode: 'production',
    entry: {
        app: './src/main.ts'
    },
    output: {
        clean: true, // 在生成文件之前清空 output 目录
        path: path.resolve(__dirname, '../dist'),
        publicPath: utils.getPublicPath(),
        filename: utils.assetsPath('js/[name]_[chunkhash:6].js'),
        chunkFilename: utils.assetsPath('js/[name]_[chunkhash:8]_chunk.js'),
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    optimization: {
        minimize: true, // 开发环境下启用 CSS 优化
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                terserOptions: {
                    mangle: true,
                    compress: {
                        warnings: false,
                        drop_console: false, 
                        drop_debugger: false,
                        pure_funcs: ['console.log'] // 清除 console.log
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'all', // 选择对哪些文件进行拆分，默认是async，即只对动态导入的文件进行拆分
            minSize: 30000, // 提取chunk的最小体积
            minChunks: 1, // 要提取的chunk最少被引用次数
            maxAsyncRequests: 5,
            maxInitialRequests: 5,
            automaticNameDelimiter: '~',
            name: false,
            cacheGroups: { // 对要提取的trunk进行分组, 缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项
                element: { // 单独拆包
                    name:'element-ui',
                    priority: 10, // 权重需大于其它缓存组
                    test: (module) => {
                        return /element/.test(module.context);
                    },
                },
                vue: { // 单独拆包
                    name:'vue',
                    priority: 9, // 权重需大于其它缓存组
                    test: (module) => {
                        return /vue|vue-router|vuex/.test(module.context);
                    },
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    name: 'commons',
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'                   
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash:8].css'),
            ignoreOrder: true
        }),
        // new optimizeCss()
    ]
});

//////引入打包体积分析
if (process.env.npm_config_report) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
}
////////


module.exports = prodConfig;
