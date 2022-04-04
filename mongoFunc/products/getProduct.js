const mongoProduct = require('../../models/products.js')

const getProduct = async function (condition) {
  const result = await mongoProduct.findOne(condition).lean().exec()

  return result
}

module.exports = getProduct
