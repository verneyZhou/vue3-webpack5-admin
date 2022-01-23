'use strict'

const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require("webpackbar");
const DashboardPlugin = require("webpack-dashboard/plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin'); // 替换 eslint-loader
const argv = require('yargs').argv;
const utils = require('./utils');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.vue', '.json', '.scss', '.css', '.less'],
        alias: {
            '@': utils.resolve('src')
        }
    },

    module: {
        rules: [           
            // {
            //     test: /\.(js|vue)$/,
            //     use: 'eslint-loader',
            //     enforce: 'pre',
            // },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        compilerOptions: { preserveWhitespace: false, whitespace: 'condense' }
                    }
                }
            },
            {
                test: /\.(t|j)s$/, // babel: es6 转 es5
                exclude: /node_modules/, // 不编译node_modules下的文件
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.ts(x)?$/,
                exclude: /node_modules/,
                use: [
                    {
                      loader: 'ts-loader',
                      options: {
                        // 指定特定的ts编译配置，为了区分脚本的ts配置
                        configFile: path.resolve(__dirname, '../tsconfig.json'),
                        // 给以.vue结尾的文件添加个.ts或.tsx后缀
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true, // 关闭类型检查，即只进行转译
                      },
                    },
                ],
            },
            {
                test: /\.svg$/,  // svg 单独配置
                loader: 'svg-sprite-loader',
                include: [path.resolve('src/assets/svg')],
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/, // 解析图片等静态资源
                dependency: { not: ['url'] }, // 排除来自新 URL 处理的 asset
                exclude: [ path.resolve('src/assets/svg')], // 
                // use: {
                //     loader: 'url-loader',
                //     options: {
                //         limit: 1024, // 字节数,意味着当图片大小小于1k的话，打包时会进行base64转换
                //         name: utils.assetsPath('images/[name].[hash:7].[ext]')
                //     }
                // },
                type: "asset/resource",
                generator: {
                    // 这里的 [ext] 扩展名通配符包含了 . ，我们不需要额外再写，跟之前的 loader 有所区别
                    filename: utils.assetsPath('images/[name]_[hash:7][ext][query]')
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 解析MP4等媒体文件
                dependency: { not: ['url'] }, // 排除来自新 URL 处理的 asset
                // use: {
                //     loader: 'url-loader',
                //     options: {
                //         limit: 1024,
                //         name: utils.assetsPath('media/[name].[hash:7].[ext]')
                //     }
                // },
                type: "asset/resource",
                generator: {
                    filename: utils.assetsPath('media/[name]_[hash:7][ext][query]')
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 解析字体
                dependency: { not: ['url'] }, // 排除来自新 URL 处理的 asset
                // use: {
                //     loader: 'url-loader',
                //     options: {
                //         limit: 10000,
                //         name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                //     }
                // },
                type: "asset/resource",
                generator: {
                    filename: utils.assetsPath('fonts/[name]_[hash:7][ext][query]'),
                },
            },
            // {
            //     test: /\.md$/,
            //     use: [
            //         {
            //             loader: 'vue-loader'
            //         },
            //         {
            //             loader: 'vue-markdown-loader/lib/markdown-compiler',
            //             options: {
            //                 raw: true
            //             }
            //         }
            //     ]
            // }
        ]
    },

    plugins: [
        
        // 解决：process is not undefined
        new webpack.ProvidePlugin({ process: 'process/browser', }),

        // 注意如果不声明文件扩展名，eslint默认只会检查js结尾的文件
        // new ESLintPlugin({ extensions: ["js", "ts", "vue"] }),

        new WebpackBar(), // 编译进度条
        new DashboardPlugin(), // webpack 美化工具
        new webpack.NoEmitOnErrorsPlugin(), // 帮助减少不需要的信息展示
        new FriendlyErrorsWebpackPlugin(), // 命令行提示优化
        new webpack.ids.HashedModuleIdsPlugin(), // 根据模块的相对路径生成一个四位数的hash作为模块id
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(`${process.env.NODE_ENV}`), // webpack5中 process.env.NODE_ENV 默认值取决于 mode
                PUBLIC_PATH: JSON.stringify(`${argv.publicPath}`),
                PATH_PREFIX: JSON.stringify(`${argv.pathPrefix}`),
                RUN_ENV: JSON.stringify(`${process.env.RUN_ENV}`)
            }
        }),

        /**
         * VueLoaderPlugin 的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
         */
        new VueLoaderPlugin(),

        new HtmlWebpackPlugin({
            title: 'vue3-webpack5-admin',
            filename: 'index.html', // 打包名称
            template: 'public/index.html', // 路径
            favicon: 'public/favicon.ico',
            inject: true,
            chunksSortMode: 'auto',
            minify: {
                html5: true, // 根据HTML5规范解析输入
                collapseWhitespace: true, // 折叠空白区域
                preserveLineBreaks: false,
                minifyCSS: true, // 压缩文内css
                minifyJS: true, // 压缩文内js
                removeComments: false // 移除注释
            },
        }),

    ]
}
