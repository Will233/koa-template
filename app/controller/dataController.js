const fs = require('fs')
const _ = require('lodash')
const {JsonResponse} = require('../lib/jsonResponse')
const cookieService = require('../service/cookieService')

const BUSSINESS_CODE_DATA = {
  DATA_FOUND: 1000,
  DATA_NOT_FOUND: 1001
}

const mockDir = './mock/'

const getMockData = (file) => {
  if (!file) {
    throw new Error('Empty filename')
  }
  try {
    return JSON.parse(fs.readFileSync(file))
  } catch (e) {
    console.log(e.message)
    return ''
  }
}

const queryData = (id) => {
  let dataFile = mockDir + 'data.json'
  let {rows: data} = getMockData(dataFile)
  console.log(data)
  let dataItem = _.find(data, (i) => {
    return parseInt(i.id) === parseInt(id)
  })
  console.log(dataItem)
  return dataItem
}

const GetData = (ctx) => {
  let id = ctx.request.query.id
  if (_.isEmpty(id)) {
    return JsonResponse(ctx, 200, {
      code: BUSSINESS_CODE_DATA.DATA_NOT_FOUND,
      message: '参数错误'
    })
  }
  let item = queryData(id)
  if (_.isEmpty(item)) {
    return JsonResponse(ctx, 200, {
      code: BUSSINESS_CODE_DATA.DATA_NOT_FOUND,
      message: '记录不存在'
    })
  } else {
    return JsonResponse(ctx, 200, {
      code: BUSSINESS_CODE_DATA.DATA_FOUND,
      message: 'success',
      data: item
    })
  }
}

const GetCookie = (ctx) => {
  let times = cookieService.getCookie(ctx, 'visitTimes') || 0
  ctx.cookies.set('visitTimes', ++times, {
    maxAge: 60000,
    httpOnly: true,
    secure: false
  })
  return JsonResponse(ctx, 200, {
    code: BUSSINESS_CODE_DATA.DATA_FOUND,
    message: 'success',
    data: {
      visitTimes: times
    }
  })
}

module.exports = {
  GetData,
  GetCookie
}