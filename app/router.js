const Route = require('koa-router')
const router = new Route()
const {checkToken} = require('./lib/jwt.js')
// 引入不同的controller
const userController = require('./controller/userController')
const dataController = require('./controller/dataController')

// login
router.post('/login', userController.Login)
// get data, 验证token
router.get('/data', checkToken, dataController.GetData)
module.exports = router