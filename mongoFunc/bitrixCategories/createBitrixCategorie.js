const mongoBitrixCategorie = require('../../models/bitrixCategories.js')

const createBitrixCategorie = async function (categorie) {
  try {
    const newCategorie = new mongoBitrixCategorie(categorie)

    const result = await newCategorie.save()

    return result
  }
  catch (err) {
    if (err) {
      console.log(err)
      return err
    }
  }
}

module.exports = createBitrixCategorie
