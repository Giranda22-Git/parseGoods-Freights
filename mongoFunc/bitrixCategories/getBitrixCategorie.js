const mongoBitrixCategorie = require('../../models/bitrixCategories.js')

const getBitrixCategorie = async function (condition) {
  const result = await mongoBitrixCategorie.findOne(condition).lean().exec()

  return result
}

module.exports = getBitrixCategorie
