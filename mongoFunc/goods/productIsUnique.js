const getGoods = require('./getGoods.js')
const isObject = require('../../staticData/lowLevelFunctions.js').isObject

const productIsUnique = async function (newProduct) {
  const minPercentagePart = 80

  delete newProduct?.id

  const allGoods = await getGoods({})

  for (const element of allGoods) {
    let product = element

    const coincidence = new Array()

    for (const key in product) {
      if (isObject(newProduct?.[key])) {
        product[key] = JSON.stringify(product[key])
        newProduct[key] = JSON.stringify(newProduct?.[key])
      }

      if (product[key] == newProduct?.[key]) {
        coincidence.push({
          value: product[key],
          percent: 100
        })
      }
    }

    const percentagePart = (coincidence.length / Object.keys(newProduct).length) * 100

    console.log(`процентное соотношение совпадения: ${coincidence.length} / ${Object.keys(newProduct).length} * 100 = ${percentagePart}`)

    if (percentagePart >= minPercentagePart) {
      return false
    }
  }

  return true
}

module.exports = productIsUnique
