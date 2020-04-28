var express = require('express');

// TODO 日志记录
global.logger = require('./src/utils/logs').logger;
let httpLogger = require('./src/utils/logs').httpLogger;

// TODO 处理 post body 参数  中间件插件
var bodyParser = require('body-parser');

// TODO 实例化 express 对象
var app = express();

// TODO 记录 HTTP 请求日志
app.use(httpLogger);

app.use(express.json());

app.use(express.urlencoded());

app.use(bodyParser.urlencoded({extended : true}));

// TODO 解决 api 跨域 并 解决 headers 中放置 token 参数
app.all('*', function(req, res, next) {
    //设为指定的域
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Access-Control-Allow-Headers", "token");
    // 收到遇见请求返回成功状态
    if(req.method == 'OPTIONS'){
        res.send(200)
    }else{
        next();
    }
});

// ==================== [ API 接口 提供 开始 ] ======================== //

// TODO 引入自动化路由数组配置项
var route = require('./src/router');

// TODO 循环动态 添加 api 路由 中间件
route.forEach((item) => {
    app.use(item.apiPath, require(`./${item.filePath}`));
});

// TODO 配置静态资源加载
// 加载静态资源
app.use(express.static('public', (req, res) => {  }));

// ==================== [ API 接口 提供 结束 ] ======================== //

// TODO api 访问捕获 headers 携带的 token 参数校验
/*app.all('*', (req, res, next) => {
    let token = req.get('token');
    if(!token || token === 'undefined' || token === ''){
        res.json({
            code : 'N',
            message : 'token 参数不存在'
        });
        return;
    }
    next();
});*/

// TODO 服务端 404 服务接口 捕获异常
app.use((req, res, next) => {

    res.json({
        code : 'N',
        message : '服务端api接口不存在！',
    })

});

// TODO 全局错误处理
app.use((err, req, res) => {

    if(err) {
        res.status(500).json({
            code : 'N',
            message : `异常捕获：${err.message || '服务端异常'}`
        })
    }

});

// TODO 启动服务
app.listen(process.env.PORT || 8088, () => {
    console.log('Sever 启动成功!');
});
