const fs = require('fs')
const _ = require('lodash')
const {JsonResponse} = require('../lib/jsonResponse')

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
  let { rows: data} = getMockData(dataFile)
  let dataItem = _.find(data, i => i.id === id)
  return dataItem
}

const GetData = (ctx) => {
  let id = ctx.request.query.id
  console.log(id)
  if (_.isEmpty(id)) {
    JsonResponse.call(ctx, 404, {
      code: BUSSINESS_CODE_DATA.DATA_NOT_FOUND,
      message: '参数错误'
    })
  }
  let item = queryData(id)
  if (_.isEmpty(item)) {
    JsonResponse.call(ctx, 404, {
      code: BUSSINESS_CODE_DATA.DATA_NOT_FOUND,
      message: '记录不存在'
    })
  } else {
    JsonResponse.call(ctx, 200, {
      code: BUSSINESS_CODE_DATA.DATA_NOT_FOUND,
      message: 'success',
      data: item
    })
  }
}

module.exports = {
  GetData
}