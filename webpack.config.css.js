/***
  独立CSS
***/
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    // context: __dirname + "/src",
    entry: {
        'p/index': "./src/js/index"
    },
    output: {
        // [name] 模块名称
        // [hash] is replaced by the hash of the compilation.
        //      hash是compilation对象计算所得，而不是具体的项目文件计算所得。
        //      所以所有的文件名都会使用相同的hash指纹。
        // filename: /[hash]/[name].js

        // [chunkhash] is replaced by the hash of the chunk.        
        // 根据模块内容计算所得hash指纹
        filename: "[name].js",
        // filename: "[name]/[chunkhash:8].js",
        // 发布路径
        path: __dirname + "/dist_css",

        //[id] is replaced by the id of the chunk.
        // [name] is replaced by the name of the chunk (or 
        //      with the id when the chunk has no name).
        // [hash] is replaced by the hash of the compilation.
        // [chunkhash] is replaced by the hash of the chunk.

        // 针对不在entry中的模块设置的发布路径
        // 可参考index.js line:8
        chunkFilename: '[name]/[chunkhash:8].js',
        // chunkFilename: '[name]/[chunkhash:8].js',

        // [file] is replaced by the filename of the JavaScript file.
        // [id] is replaced by the id of the chunk.
        // [hash] is replaced by the hash of the compilation.
        // default:[file].map
        sourceMapFilename: '[file].map',

        // 在注释中输出模块信息
        pathinfo: false,

        // 发布路径，如二级目录、域名:
        publicPath: "/dist_css/"
            // publicPath: "http://cdn.example.com/assets/[hash]/"
    },
    module: {
        // 不需要loader处理的文件
        // 正则或数组
        // noParse: [],
        loaders: [{
            test: /\.css$/,
            // 改路径下的模块不会被loader处理
            // exclude: [],
            // 该路径下的模块会被loader处理
            // include: [
            //     path.resolve(__dirname, "app/src"),
            //     path.resolve(__dirname, "app/test")
            // ],
            // 使用叹号分割loader
            // '-loader' 可省略
            loader:  ExtractTextPlugin.extract("style-loader", "css-loader")
                // loader数组
                // loaders:'style!css']
                // loaders:['style', 'css']
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
        }, {
            test: /\.html?$/,
            exclude: /node_modules/,
            loader: 'html',
        }, {
            test: /\.png|\.jpg$/,
            loader: 'url?limit=10240'
        }],
        // 在module.loaders处理前执行的loader，语法和module.loaders相同
        preLoaders:[],
        // 在module.loaders处理后执行的loader，语法和module.loaders相同
        postLoaders:[]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new ExtractTextPlugin("styles.css"),
    ],
    resolve: {
        // 模块别名
        // alias: {
        //     xyz: "/absolute/path/to/file.js",
        //     src: path.resolve(__dirname, '../src')
        // },
 
        // 模块存放路径
        // notice: 必须是绝对路径
        // root: [
        //     path.resolve('./app/modules'),
        //     path.resolve('./vendor/modules')
        // ],

        // 模块目录
        // modulesDirectories: [
        // 默认值：
        // ["web_modules", "node_modules"]
        // ],


        // 如果在root和 modulesDirectories中找不到，就会在这里搜索
        // 一个绝对路径的数组
        fallback:[],

        // 用于模块查找的扩展名
        // Default: ["", ".webpack.js", ".web.js", ".js"]
        // notice: 设置该参数后，默认值将被覆盖。你设置的值必须包括空字符串""，
        //      以便能正确找到模块(如:require('./somefile.ext'))。如果你想引用时不写
        //      扩展名，需要包括该后缀名（如:".js")
        // extensions:[],

        // 在package.json中查找这些字段，读取文件作为模块
        // Default: ["webpack", "browser", "web", "browserify", ["jam", "main"], "main"]
        // packageMains:[]

        //在package.json中查找这些字段。。。https://gist.github.com/defunctzombie/4339901
        // packageAlias:{}
        

    },
    // 针对loader设置查找路径
    // // Default:
    // {
    //     modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
    //     extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
    //     packageMains: ["webpackLoader", "webLoader", "loader", "main"]
    // }
    // resolveLoader:{}

    // 不通过webpack处理的模块
    // 参数可以是对象、正则或方法，具体参见：
    // http://webpack.github.io/docs/configuration.html#externals
    externals:[{
        // 在脚本中require('jquery')时，webpack会包装全局变量jQuery并返回
        'jquery': 'jQuery'
    }],

    // 目标环境
    // "web" Compile for usage in a browser-like environment (default)
    // "webworker" Compile as WebWorker
    // "node" Compile for usage in a node.js-like environment (use require to load chunks)
    // "async-node" Compile for usage in a node.js-like environment (use fs and vm to load chunks async)
    // "node-webkit" Compile for usage in webkit, uses jsonp chunk loading but also supports builtin node.js modules plus require(“nw.gui”) (experimental)
    // "electron" Compile for usage in Electron – supports require-ing Electron-specific modules.
    // target: 

    // 每个模块的时间打点信息
    profile:'',
    // 是否开启编译缓存以提高性能。watch模式默认开启
    cache: false,

    // 切换loader的调试模式
    // debug: false,

    // 开发工具 http://webpack.github.io/docs/configuration.html#devtool
    // eval - Each module is executed with eval and //@ sourceURL.
    // source-map - A SourceMap is emitted. See also output.sourceMapFilename.
    // hidden-source-map - Same as source-map, but doesn’t add a reference comment to the bundle.
    // inline-source-map - A SourceMap is added as DataUrl to the JavaScript file.
    // eval-source-map - Each module is executed with eval and a SourceMap is added as DataUrl to the eval.
    // cheap-source-map - A SourceMap without column-mappings. SourceMaps from loaders are not used.
    // cheap-module-source-map - A SourceMap without column-mappings. SourceMaps from loaders are simplified to a single mapping per line.
    devtool: '#source-map',

    // 传给webpack-dev-server的参数
    // devServer:{}

    // 传递给node作为polyfills和mocks的参数
    // node:{}

    // require.mad和define.amd对应的值。比如{jQuery:true}
    // amd:{}

}