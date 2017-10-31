// data Service
const fs = require('fs')
const _ = require('lodash')

const mockDir = '../../mock/'
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

// 获取data
const getData = (id) => {
  let dataFile = mockDir + 'data.json'
  let { rows: data } = getMockData(dataFile)
  if (data != null && !_.isEmpty(data)) {
    let target = _.find(data, i => i.id === id)
    return target
  } else {
    return null
  }
}

module.exports = {
  getData
}

