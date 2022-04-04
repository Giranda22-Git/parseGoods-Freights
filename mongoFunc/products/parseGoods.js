const axios = require('axios').default

const getSuppliers = require('../suppliers/getSuppliers.js')
const productIsUnique = require('./productIsUnique.js')
const createProducts = require('./createProducts.js')

const parseProducts = async function () {
  const suppliers = await getSuppliers({})

  const listOfNewProducts = new Array()

  for (const supplier of suppliers) {
    const response = await axios[supplier.method](supplier.url)

    const responseData = response.data

    for (const product of responseData) {
      const isUnique = await productIsUnique(product)

      if (isUnique) {
        const result = await createProducts(product)

        listOfNewProducts.push(result)
      }
    }
  }

  return listOfNewProducts
}

module.exports = parseProducts
