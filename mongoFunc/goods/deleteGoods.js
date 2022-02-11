const mongoGoods = require('../../models/goods.js')

const deleteGoods = async function (goods, count) {
  if (!count || count > goods.length) count = goods.length

  const listOfDeletedGoods = new Array()

  for (let index = 0; index < count; index++) {
    listOfDeletedGoods.push(await mongoGoods.deleteOne({ _id: goods[index]._id }))
  }

  return listOfDeletedGoods
}

module.exports = deleteGoods
