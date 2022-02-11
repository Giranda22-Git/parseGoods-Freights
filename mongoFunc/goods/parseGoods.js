const axios = require('axios').default

const getSuppliers = require('../suppliers/getSuppliers.js')
const productIsUnique = require('./productIsUnique.js')
const createGoods = require('./createGoods.js')

const parseGoods = async function () {
  const suppliers = await getSuppliers({})

  const listOfNewProducts = new Array()

  for (const supplier of suppliers) {
    const response = await axios[supplier.method](supplier.url)

    const responseData = response.data

    for (const product of responseData) {
      const isUnique = await productIsUnique(product)

      if (isUnique) {
        const result = await createGoods(product)

        listOfNewProducts.push(result)
      }
    }
  }

  return listOfNewProducts
}

module.exports = parseGoods
