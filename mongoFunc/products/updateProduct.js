const mongoProduct = require('../../models/products.js')
const getProduct = require('./getProduct.js')

const updateProduct = async function (supplier, product) {
  const targetProduct = await getProduct({ supplier, originProductId: product.originProductId })

  const resLog = await mongoProduct.updateOne(
    { supplier, originProductId: product.originProductId },
    {
      originProductId: product.originProductId,
      originLinkToProductPage: product.originLinkToProductPage,
      brandName: product.brandName,
      productName: product.productName,
      assurance: product.assurance,
      RRP: product.RRP,
      dealerPrice: product.dealerPrice,
      properties: product.properties,
      description: product.description,
      categories: targetProduct.categories,
      images: product.images,
      supplier: product.supplier
    }
  )

  return resLog
}

module.exports = updateProduct
