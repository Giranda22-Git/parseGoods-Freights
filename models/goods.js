const mongoose = require('mongoose')

const good = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  crmId: {
    type: String,
    required: true
  },
  offerData: {
    type: Object,
    required: true
  },
  count: {
    type: Number,
    required: true,
    min: 0
  }
})

const mongoGoods = mongoose.model('goods', good)
module.exports = mongoGoods
