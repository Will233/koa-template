/**
 * 权限验证模块，模块，正则匹配
 */
const _ = require('lodash')
const {GetMockData} = require('./daoService')

// 根据用户名获取用户权限,正则字符串
const getAuth = (username) => {
  let authDoc = GetMockData('role.json')
  let authArray = authDoc ? authDoc.rows : []
  let userDoc = GetMockData('user.json')
  let userArray = userDoc ? userDoc.rows : []
  // console.log(authArray)
  // console.log(userArray)
  if(_.isEmpty(authArray)) return null
  if(_.isEmpty(userArray)) return null
  const user = _.find(userArray, (x) => {
    return x.username === username
  })
  let role = user.role
  const authObj = _.find(authArray, (x) => {
    return x.rolename === role
  })
  return authObj.auth
}

/**
 * 校验用户的权限
 * @param {*} ctx 
 * @param {*} next 
 */
const checkAuth = async (ctx, next) => {
  const username = ctx.headers.username
  // const userid = ctx.headers.userid
  if (_.isEmpty(username)) {
    ctx.status = 401
    ctx.body = {
      message: '无权限访问'
    }
  }

  const userAuth = getAuth(username)
  if (_.isEmpty(userAuth)) {
    ctx.status = 401
    ctx.body = {
      message: '无权限访问'
    }
  } else {
    const url = ctx.url
    let authReg = new RegExp(userAuth)
    // 判断对链接地址的访问是否合法
    if (authReg.test(url)) {
      return next()
    } else {
      console.log(`${username} has no access permission`)
      ctx.status = 401
      ctx.body = {
        message: '无权限访问'
      }
    }
  }
}

module.exports = {
  checkAuth
}