const Koa = require('koa')
const router = require('./app/router.js')
const app = new Koa()
const koaStatic = require('koa-static-server')
const bodyParser = require('koa-body-parser')
const AppInfo = require('./config/config.default.js')()
app.use(bodyParser())
console.log(AppInfo)
// 静态目录
app.use(koaStatic({rootDir: './app/public', rootPath: '/public'}));
app.use(router.routes()).use(router.allowedMethods());
app.listen(AppInfo.port)
console.log('Koa server is started ...')