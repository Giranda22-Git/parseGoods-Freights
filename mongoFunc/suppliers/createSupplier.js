const mongoSupplier = require('../../models/suppliers.js')

const createSupplier = async function (data) {
  try {
    const newSupplier = new mongoSupplier(data)

    const result = await newSupplier.save()

    return result
  }
  catch (err) {
    if (err) {
      return err
    }
  }
}

module.exports = createSupplier
