const Route = require('koa-router')
const router = new Route()

// 引入不同的controller
const userController = require('./controller/userController')
const dataController = require('./controller/dataController')

// login
router.post('/login', userController.Login)
// get data
router.get('/data', dataController.GetData)
module.exports = router