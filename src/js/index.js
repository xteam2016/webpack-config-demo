require('../styles/index.css')
// require时指定loader
// require('!style!css!../css/index.css')

console.log(require('./abc.jsx'));
console.log(require('../img/a.jpg'));

// 异步加载文件
// 配合webpack.config.js: output.chunkFilename 使用
require.ensure([], function(require) {
    require.include("./amd2.jsx")
    console.log(require("./amd.jsx"))
}, 'tips');

var jq = require('jquery');
jq('body')
// .append('<h1>hello webpack<img src="'+require('../img/a.jpg')+'"></h1>abcsdf')
.append(require('../tpl/a.html'));