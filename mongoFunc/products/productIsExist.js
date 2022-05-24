const getProduct = require('./getProduct.js')

const productIsExist = async function (supplier, product) {
  const targetProduct = await getProduct({ supplier, originProductId: product.originProductId, lang: product.lang })

  if (targetProduct) return true
  return false
}

module.exports = productIsExist
