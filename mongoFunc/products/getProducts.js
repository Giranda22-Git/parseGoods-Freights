const mongoProduct = require('../../models/products.js')

const getProducts = async function (condition) {
  const result = await mongoProduct.find(condition).lean().exec()

  return result
}

module.exports = getProducts
