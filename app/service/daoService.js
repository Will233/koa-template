/**
 * 用于访问数据源
 */
const fs = require('fs')
const mockDir = './mock/'

const GetMockData = (file) => {
  if (!file) {
    throw new Error('Empty filename')
  }
  try {
    return JSON.parse(fs.readFileSync(mockDir + file))
  } catch (e) {
    console.log(e.message)
    return ''
  }
}

module.exports = {
  GetMockData
}