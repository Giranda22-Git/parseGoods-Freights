const mongoose = require('mongoose')

const categorie = new mongoose.Schema({
  code: {
    type: String
  },
  iblockId: {
    type: Number
  },
  iblockSectionId: {
    type: Number
  },
  id: {
    type: Number
  },
  name: {
    type: String
  },
  supplier: {
    type: String
  },
  categorieLevel: {
    type: Number
  },
  lang: {
    type: String,
    enum: ['ru', 'en']
  }
})

const mongoBitrixCategorie = mongoose.model('bitrixCategories', categorie)
module.exports = mongoBitrixCategorie
