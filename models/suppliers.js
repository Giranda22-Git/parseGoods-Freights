const mongoose = require('mongoose')

const supplier = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  site: {
    type: String
  },
  format: {
    type: String
  },
  url: {
    type: String
  },
  method: {
    type: String
  },
  getParams: {
    type: Object
  },
  postParams: {
    type: Object
  }
})

const mongoSupplier = mongoose.model('suppliers', supplier)
module.exports = mongoSupplier
