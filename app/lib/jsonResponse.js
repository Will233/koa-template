/**
 * 请求返回类
 * 工厂模式
 * code: // 自定义业务状态码
 * message: "" // 返回消息
 * data: {}//返回的业务数据
 * extra: {} //全局附加数据
 */

/* Code 业务自定义状态码定义示例
// 授权相关
1001: 无权限访问
1002: access_token过期
1003: unique_token无效
...
// 用户相关
2001: 未登录
2002: 用户信息错误
2003: 用户不存在
// 业务1
3001: 业务1XXX
3002: 业务1XXX
*/
// 日期字段强行使用时间戳

// 根据传入参数返回res body
// code, data, message, extra

const createResponseBody = (body) => {
  let resBody = {
    code: code,
    message: message,
    data: data,
    extra: extra
  } = body
  return resBody
}

const JsonResponse =  (httpCode, body) => {
  this.status = httpCode
  this.body = createResponseBody(body)
}

module.exports = {
  JsonResponse
}