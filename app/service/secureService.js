// 加密
const sha1 = require('sha1')

// 用户密码加密
const encryptPassword = (pwd, key) => {
  try {
    if (pwd == null || pwd.length < 1) {
      return null
    }
    return sha1(pwd + key)
  } catch (e) {
    throw new Error ('加密失败：' + e.message)
    return null
  }
}

module.exports = {
  encryptPassword
}