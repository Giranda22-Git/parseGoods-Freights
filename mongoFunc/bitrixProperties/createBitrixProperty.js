const mongoBitrixProperty = require('../../models/bitrixProperties.js')

const createBitrixProperty = async function (property) {
  try {
    const newProperty = new mongoBitrixProperty(property)

    const result = await newProperty.save()

    return result
  }
  catch (err) {
    if (err) {
      console.log(err)
      return err
    }
  }
}

module.exports = createBitrixProperty
