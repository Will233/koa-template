const jwt = require('jsonwebtoken')

const createToken = (userId, signkey) => {
  const token = jwt.sign({
    userId: userId
  }, signkey, {
    expiresIn: '60s'
  })
  return token
}

// 验证token,这里是在header 中记录，后续可更改为在cookie 中存储
const checkToken = async (ctx, next) => {
  if (ctx.request.header['authorization']) {
    let token = ctx.request.header['authorization'].split(' ')[1];
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token, 'sinner77');     //如果token过期或验证失败，将抛出错误
    } catch (err) {
        ctx.throw(401, 'invalid token');
    }
    await next()
  } else {
    ctx.status = 401
    ctx.body = {
      code: 4001,
      message: '没有token'
    }
  }
}

module.exports = {
  createToken,
  checkToken
}