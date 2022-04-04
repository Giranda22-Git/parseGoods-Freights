const mongoose = require('mongoose')

const product = new mongoose.Schema({
  originProductId: {
    type: String,
    required: true
  },
  originLinkToProductPage: {
    type: String
  },
  brandName: {
    type: String
  },
  productName: {
    type: String
  },
  assurance: {
    type: String
  },
  RRP: {
    type: String
  },
  dealerPrice: {
    type: String
  },
  properties: {
    type: Object
  },
  description: {
    type: String
  },
  categories: {
    type: []
  },
  images: {
    type: [String]
  },
  supplier: {
    type: String
  }
})

const mongoProducts = mongoose.model('Products', product)
module.exports = mongoProducts
