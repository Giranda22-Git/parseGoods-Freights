const mongoGoods = require('../../models/goods.js')

const createGoods = async function (data) {
  try {
    console.log(data)
    const newGoods = new mongoGoods(data)

    const result = await newGoods.save()

    return result
  }
  catch (err) {
    if (err) {
      console.log(err)
      return err
    }
  }
}

module.exports = createGoods
