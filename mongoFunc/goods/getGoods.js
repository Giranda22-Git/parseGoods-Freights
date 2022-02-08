const mongoGoods = require('../../models/goods.js')

const getGoods = async function (condition) {
  const result = await mongoGoods.find(condition).lean().exec()

  return result
}

module.exports = getGoods
