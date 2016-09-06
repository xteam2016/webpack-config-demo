require('../styles/index.css');
// require时指定loader
// require('!style!css!../css/index.css')
console.log(require('./abc.jsx'));
console.log(require('../img/a.jpg'));
var jq = require('jquery');
jq('#loginForm').on('submit', function(e) {
    e.preventDefault();

    if (!jq('#username').val()) {
        alert('用户名不能为空')
        return 
    }
    if (!jq('#password').val()) {
        alert('密码不能为空')
        return 
    }
    alert('登录成功');
});