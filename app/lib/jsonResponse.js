/**
 * 请求返回
 * code: // 自定义业务状态码
 * message: "" // 返回消息
 * data: {}//返回的业务数据
 * extra: {} //全局附加数据
 */

const createResponseBody = (body) => {
  let resBody = {
    code: code,
    message: message,
    data: data,
    extra: extra
  } = body
  return resBody
}

const JsonResponse =  (ctx, httpCode, body) => {
  ctx.status = httpCode
  ctx.body = createResponseBody(body)
}

module.exports = {
  JsonResponse
}