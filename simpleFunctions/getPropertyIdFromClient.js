const axios = require('axios').default
const getBitrixProperty = require('../mongoFunc/bitrixProperties/getBitrixProperty.js')
const createBitrixProperty = require('../mongoFunc/bitrixProperties/createBitrixProperty.js')
const settings = require('../staticData/mountedData.js').data

const getPropertyIdFromClient = async function (propertyName, iblockId) {
  let targetProperty = await getBitrixProperty({ name: propertyName, iblockId })

  if (!targetProperty) {
    const bitrixCreatePropertyUrl = encodeURI(settings.urls.bitrixCreatePropertyUrl + propertyName)

    console.log(bitrixCreatePropertyUrl)

    const newPropertyResult = (await axios.get(bitrixCreatePropertyUrl)).data

    console.log('newPropertyResult: ', newPropertyResult)

    const newLocalePropertyResult = await createBitrixProperty({
      iblockId,
      id: newPropertyResult.result,
      name: propertyName
    })

    console.log(newLocalePropertyResult)

    targetProperty = {
      id: newPropertyResult.result
    }
  }

  return targetProperty.id
}

module.exports = getPropertyIdFromClient
