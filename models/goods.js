const mongoose = require('mongoose')

const good = new mongoose.Schema({
  title: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  image: {
    type: String
  },
  rating: {
    type: Object
  }
})

const mongoGoods = mongoose.model('goods', good)
module.exports = mongoGoods
