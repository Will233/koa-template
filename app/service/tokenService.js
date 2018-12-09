/**
 * 应用网关服务
 * token 生成和校验
 */
const jwt = require('jsonwebtoken')
const appConfig = require('../../config/config.default.js')()

/**
 * 生成 jwt 
 * @param {*} userid 
 * @param {*} username 
 */
const createToken = (userid, username) => {
  const jwtToken = jwt.sign({
    userid: userid,
    username: username
  }, appConfig.jwtSignKey, {
    expiresIn: '1200s'
  })
  return jwtToken
}

/**
 * 从 cookie 中拿 token ,解析判断是否合法
 * @param {*} ctx 
 * @param {*} next 
 */
const checkToken = async (ctx, next) => {
  let token = ctx.cookies.get('access_token')
  if (!token) {
    ctx.status = 401
    ctx.body = {
      message: '无权限访问'
    }
  } else {
    try {
      let decodedToken = jwt.verify(token, appConfig.jwtSignKey)
      let userid = decodedToken.userid
      let username = decodedToken.username
      
      console.log(JSON.stringify(ctx.headers))
      // 将解析到的 userid 和 username 加到header中,用于后面的处理
      Object.assign(ctx.headers, {
        userid: userid,
        username: username
      })
      console.log(JSON.stringify(ctx.headers))
      return next()
    } catch (err) {
      console.log(err)
      ctx.status = 401
      ctx.body = {
        message: '无权限访问'
      }
    }
  }
}



module.exports = {
  createToken,
  checkToken
}