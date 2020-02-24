const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./router/router')
const expressSession = require('express-session')

//配置art-template
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/'));
//设置中间件
app.use(expressSession({
    //cookie的名字
    name: "dss",
    //cookie签名的信息
    secret: 'secret',
    //cookie的有效时间 3分钟
    cookie: {
        maxAge: 1000 * 60 * 3,
    },
    //即使session的信息没有变化，也会重新保存session
    resave: false,
    //如果saveUninitialized为true，他会将没有初始化的session的数据保存到storage中
    saveUninitialized: false,
    //主要作用：每次请求都重置cookie过期时间
    rolling: true,
    //指定session数据存储的地方(数据库),默认情况下session会话数据是保存在服务器的内存中
    store: null
}));
// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", router);
//public设为静态

app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')));

app.listen('2222', function() {
    console.log('服务器已启动...');
})