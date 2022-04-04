const mongoBitrixCategorie = require('../../models/bitrixCategories.js')

const getBitrixCategories = async function (condition) {
  const result = await mongoBitrixCategorie.find(condition).lean().exec()

  return result
}

module.exports = getBitrixCategories
