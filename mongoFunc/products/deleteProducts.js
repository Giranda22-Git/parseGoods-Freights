const mongoProduct = require('../../models/products.js')

const deleteProducts = async function (supplier, products) {
  for (const product of products) {
    await mongoProduct.deleteOne({ supplier, originProductId: product.originProductId }).exec()
  }

  return products
}

module.exports = deleteProducts
