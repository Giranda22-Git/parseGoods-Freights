const mongoose = require('mongoose')

const property = new mongoose.Schema({
  iblockId: {
    type: Number
  },
  id: {
    type: Number
  },
  name: {
    type: String
  }
})

const mongoBitrixProperty = mongoose.model('bitrixProperty', property)
module.exports = mongoBitrixProperty
