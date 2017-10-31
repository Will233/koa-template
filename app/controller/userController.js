const fs = require('fs')
const _ = require('lodash')
const secureService = require('../service/secureService')
const {JsonResponse} = require('../lib/jsonResponse')

const mockDir = '../../mock/'
  //业务状态码 ModuleCode + detailCode
  // user模块 2000
const BUSSINESS_CODE = {
  LOGIN_SUCCESS: 2000,
  USER_NOT_EXIST: 2001,
  WRONG_PASSWORD: 2002,
  ILEGAL_PARAMS: 2003
}
const getMockData = (file) => {
  if (!file) {
    throw new Error('Empty filename')
  }
  try {
    return JSON.parse(fs.readFileSync(file))
  } catch (e) {
    console.log(e.message)
    return ''
  }
}

const Login = (ctx) => {
  let username = ctx.request.body.username
  let password = secureService.encryptPassword(ctx.request.body.password)
  if (_.isEmpty(username) || _.isEmpty(password)){
    JsonResponse.call(ctx, 400, {
      code: BUSSINESS_CODE.ILEGAL_PARAMS,
      message: '参数非法'
    })
  }
  let userFile = mockDir + 'user.json'
  let { rows: users} = getMockData(userFile)
  if (_.isEmpty(users)) {
    JsonResponse.call(ctx, 404, {
      code: BUSSINESS_CODE.USER_NOT_EXIST,
      message: '用户不存在'
    })
  }
  let userItem = _.find(users, i => i.username === username)
  if (userItem == undefined || userItem == null) {
    JsonResponse.call(ctx, 404, {
      code: BUSSINESS_CODE.USER_NOT_EXIST,
      message: '用户不存在'
    })
  }
  if (userItem.password !== password) {
    JsonResponse.call(ctx, 401, {
      code: BUSSINESS_CODE.WRONG_PASSWORD,
      message: '用户名或者密码错误'
    })
  }
  JsonResponse.call(ctx, 200, {
    code: BUSSINESS_CODE.LOGIN_SUCCESS,
    message: '登录成功'
  })
}
module.exports = {
  Login
}