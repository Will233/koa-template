const fs = require('fs')
const _ = require('lodash')
const secureService = require('../service/secureService')
const {JsonResponse} = require('../lib/jsonResponse')
const tokenService = require('../service/tokenService')
const {GetMockData} = require('../service/daoService')
const AppInfo = require('../../config/config.default.js')()
  //业务状态码 ModuleCode + detailCode
  // user模块 2000
const BUSSINESS_CODE = {
  LOGIN_SUCCESS: 2000,
  USER_NOT_EXIST: 2001,
  WRONG_PASSWORD: 2002,
  ILEGAL_PARAMS: 2003,
  QUERY_SUCCESS: 2004
}

const Login = (ctx) => {
  let username = ctx.request.body.username
  let password = secureService.encryptPassword(ctx.request.body.password, AppInfo.pwdSignKey)
  console.log(username)
  console.log(password)
  if (_.isEmpty(username) || _.isEmpty(password)){
    return JsonResponse(ctx, 400, {
      code: BUSSINESS_CODE.ILEGAL_PARAMS,
      message: '参数非法'
    })
  }
  let { rows: users} = GetMockData('user.json')
  if (_.isEmpty(users)) {
    return JsonResponse(ctx, 404, {
      code: BUSSINESS_CODE.USER_NOT_EXIST,
      message: '用户不存在'
    })
  }
  let userItem = _.find(users, i => i.username === username)
  if (userItem == undefined || userItem == null) {
    return JsonResponse(ctx, 404, {
      code: BUSSINESS_CODE.USER_NOT_EXIST,
      message: '用户不存在'
    })
  }
  if (userItem.password !== password) {
    return JsonResponse(ctx, 401, {
      code: BUSSINESS_CODE.WRONG_PASSWORD,
      message: '用户名或者密码错误'
    })
  }
  //jwt 生成
  let token = tokenService.createToken(userItem.id, userItem.username)
  ctx.cookies.set('access_token', token)
  return JsonResponse(ctx, 200, {
    code: BUSSINESS_CODE.LOGIN_SUCCESS,
    message: '登录成功'
  })
}

const GetUser = (ctx) => {
  let id = ctx.request.query.id
  let { rows: users} = GetMockData('user.json')
  if (_.isEmpty(users)) {
    return JsonResponse(ctx, 200, {
      code: BUSSINESS_CODE.USER_NOT_EXIST,
      message: '用户不存在'
    })
  }
  let user = _.find(users, x => parseInt(x.id) === parseInt(id))
  if (_.isEmpty(user)) {
    return JsonResponse(ctx, 200, {
      code: BUSSINESS_CODE.USER_NOT_EXIST,
      message: '用户不存在'
    })
  }
  return JsonResponse(ctx, 200, {
    code: BUSSINESS_CODE.QUERY_SUCCESS,
    message: 'success',
    data: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  })
}

module.exports = {
  Login,
  GetUser
}