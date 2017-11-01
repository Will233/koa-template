'use strict'

const fs = require('fs')
const path = require('path')

module.exports = appInfo => {
  const config = {
    env: 'development',
    name: 'koa-template',
    port: 3003,
    pwdSignKey: 'password_key',
    jwtSignKey: 'jwt_sign_key'
  }
  // 404 页面
  config.notfound = {
    pageUrl: ''
  }

  return config
}

