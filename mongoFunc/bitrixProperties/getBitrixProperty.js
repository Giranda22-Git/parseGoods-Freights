const mongoBitrixProperty = require('../../models/bitrixProperties.js')

const getBitrixProperty = async function (condition) {
  const result = await mongoBitrixProperty.findOne(condition).lean().exec()

  return result
}

module.exports = getBitrixProperty
