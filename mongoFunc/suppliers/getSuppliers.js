const mongoSuppliers = require('../../models/suppliers.js')

const getSuppliers = async function (condition) {
  const result = await mongoSuppliers.find(condition).lean().exec()

  return result
}

module.exports = getSuppliers
