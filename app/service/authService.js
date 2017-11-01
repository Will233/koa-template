/**
 * 权限验证模块，模块，正则匹配
 */
const _ = require('lodash')
const {GetMockData} = require('./daoService')

// 根据用户名获取用户权限,正则字符串
const GetAuth = (username) => {
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

module.exports = {
  GetAuth
}