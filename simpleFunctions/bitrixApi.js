const axios = require('axios').default
const settings = require('../staticData/mountedData.js').data

const bitrixApi = async function (method, gateway, data) {
  try {
    if (!data) data = {}

    let requestString = 'https://freights.kz/rest/admin/' + settings.bitrixToken + '/' + gateway

    requestString = encodeURI(requestString)

    console.log(requestString, data)

    const result = (await axios[method](requestString, data)).data

    return result
  }
  catch (err) {
    console.log('err: ', err.response.data)
  }
}

module.exports = bitrixApi
