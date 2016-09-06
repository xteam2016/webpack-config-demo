/***
  多页面开发方案示例
***/
var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    entry: {
        // 页面发布到p目录下
        'p/index': "./src/js/index",
        'p/login': "./src/js/login"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist_mul",
        chunkFilename: '[name]/[chunkhash:8].js',
        sourceMapFilename: '[file].map',
        publicPath: "./"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.html$/,
            loader: "html"
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
        }, {
            test: /\.png|\.jpg$/,
            loader: 'url?limit=10240'
        }]
    },
    plugins: [],
    devtool: '#source-map'
};

// 自动添加HTML页面
var pages = Object.keys(getEntry('./src/views/*.html', 'src/views/'));

pages.forEach(function(pathname) {
    var conf = {
        filename: pathname + '.html', //生成的html存放路径，相对于path
        template: 'src/views/'+pathname + '.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
    if (('p/'+pathname) in config.entry) {
        conf.inject = true;
        conf.chunks = ['p/'+pathname];
        conf.hash = true;
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
});



function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        entries[pathname] = './' + entry;
    }
    return entries;
}

module.exports = config;