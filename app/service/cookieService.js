/**
 * cookie 的操作，cookie 相关的验证,
 * 存储jwt
 */
const _ = require('lodash')

const serializeCookie = (name, value, opt) => {
  var pairs = [name + '=' + value]
  opt = opt || {}
  if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge)
  if (opt.domain) pairs.push('Domain=' + opt.domain)
  if (opt.path) pairs.push('Path=' + opt.path)
  if (opt.expires) pairs.push('Expires=' + opt.expires)
  if (opt.httpOnly) pairs.push('HttpOnly')
  if (opt.secure) pairs.push(Secure)
  return pairs.join(';')
}

const setCookie = (name, value, opt) => {
}

const delCookie = () => {

}

const parseCookie = (cookie) => {
  let cookies = {}
  if (!cookies) {
    return cookies
  }

  let list = cookie.split(';')
  _.map(list, (x) => {
    let arr = x.split('=')
    cookies[arr[0]] = arr[1]
  })
  return cookies
}

const getCookie = (ctx, name) => {
  let cookie = ctx.cookies.get(name)
  // return parseCookie(cookie)
  return cookie
}


module.exports = {
  serializeCookie,
  getCookie,
  setCookie,
  delCookie
}