const bitrixApi = require('./bitrixApi.js')

const deleteProductsOnClient = async function (options) {
  if (options.id) {
    const result = await bitrixApi('post', 'catalog.product.delete', {id: options.id})
    console.log(result)
  } else {
    for (let index = options.from; index <= options.to; index++) {
      const result = await bitrixApi('post', 'catalog.product.delete', {id: index})
      console.log(result)
    }
  }
}

module.exports = deleteProductsOnClient
