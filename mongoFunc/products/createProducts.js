const mongoProduct = require('../../models/products.js')

const createProducts = async function (product) {
  try {
    const newProducts = new mongoProduct(product)

    const result = await newProducts.save()

    return result
  }
  catch (err) {
    if (err) {
      console.log(err)
      return err
    }
  }
}

module.exports = createProducts
