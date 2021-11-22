const path = require("path");
const resolve= file=>path.resolve(__dirname,file)
const VueLoaderPlugin = require("vue-loader/lib/plugin")

const isProd=process.env.NODE_ENV==='production'

const vuePlugin = new VueLoaderPlugin();

module.exports = {
    mode: isProd?'production':'development',
    //设置出口文件
    output: {
        //设置路径
        path: resolve("../dist/"),
        // 设置公共路径
        publicPath:'/dist/',
        //设置文件名
        filename: "[name].[chunkhash].js"
    },
    resolve:{
        alias:{
            '@':resolve('../src/')
        },
        extensions:['.js','.vue','.json']
    },
    devtool:isProd?'source-map':'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                //test设置需要匹配的文件类型，支持正则
                test: /\.css$/,
                //use表示该文件类型需要调用的loader
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                //limit用来设置字节数，只有小于limit值的图片，才会转换
                //为base64图片
                use: "url-loader?limit=16940"
            },
            {
                test: /\.js$/,
                use: "babel-loader",
                //exclude为排除项，意思是不要处理node_modules中的js文件
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            }
        ]
    },
    plugins: [vuePlugin],
}
