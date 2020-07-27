const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
    // 入口js路径
    entry: {
        index: './src/js/index.js',
        login: './src/js/login.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /jquery/,
                    name: 'jquery',
                    chunks: 'all'
                },
                styles: {
                    test: /[\\/]common[\\/].+\.css$/,
                    name: 'style',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        // 自动清空dist目录
        new CleanWebpackPlugin(),
        // 设置html模板生成路径
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            chunks: ['style', 'jquery', 'index']
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/html/login.html',
            chunks: ['style', 'jquery', 'login']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: './src/static', to: 'static' }
        //     ],
        //   }),
       
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-transform-modules-commonjs'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // css中的图片路径增加前缀
                            publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // css中的图片路径增加前缀
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attributes: {
                            list: [
                                {
                                    // Tag name
                                    tag: 'img',
                                    // Attribute name
                                    attribute: 'src',
                                    // Type of processing, can be `src` or `scrset`
                                    type: 'src',
                                },
                                {
                                    // Tag name
                                    tag: 'img',
                                    // Attribute name
                                    attribute: 'srcset',
                                    // Type of processing, can be `src` or `scrset`
                                    type: 'srcset',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'data-src',
                                    type: 'src',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'data-srcset',
                                    type: 'srcset',
                                },
                                {
                                    // Tag name
                                    tag: 'link',
                                    // Attribute name
                                    attribute: 'href',
                                    // Type of processing, can be `src` or `scrset`
                                    type: 'src',
                                    // Allow to filter some attributes
                                    filter: (tag, attribute, attributes, resourcePath) => {
                                        // The `tag` argument contains a name of the HTML tag.
                                        // The `attribute` argument contains a name of the HTML attribute.
                                        // The `attributes` argument contains all attributes of the tag.
                                        // The `resourcePath` argument contains a path to the loaded HTML file.

                                        if (/my-html\.html$/.test(resourcePath)) {
                                            return false;
                                        }

                                        if (!/stylesheet/i.test(attributes.rel)) {
                                            return false;
                                        }

                                        if (
                                            attributes.type &&
                                            attributes.type.trim().toLowerCase() !== 'text/css'
                                        ) {
                                            return false;
                                        }

                                        return true;
                                    },
                                },
                            ],
                        }
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif|webp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 最终生成的css代码中,图片url前缀
                            //   publicPath: '../images',
                            // 图片输出的实际路径(相对于dist)
                            outputPath: 'images',
                            // 当小于某KB时转为base64
                            limit: 0
                        }
                    }
                ]
            }
        ]
    },

 

    // 编译输出配置
    output: {
        // js生成到dist/js，[name]表示保留原js文件名
        filename: 'js/[name].js',
        // 输出路径为dist
        path: path.resolve(__dirname, 'dist')
    }
}
