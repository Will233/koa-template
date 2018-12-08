const Route = require('koa-router')
const router = new Route()
const {checkToken} = require('./service/tokenService.js')
const {checkAuth} = require('./service/authService')
// 引入不同的controller
const userController = require('./controller/userController')
const dataController = require('./controller/dataController')

// login
router.post('/login', userController.Login)
router.get('/user', checkToken, userController.GetUser)
// get data, 验证token
router.get('/data', checkToken, checkAuth, dataController.GetData)
router.get('/data/cookie', dataController.GetCookie)
module.exports = router