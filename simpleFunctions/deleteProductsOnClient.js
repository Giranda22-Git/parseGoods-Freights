const bitrixApi = require('./bitrixApi.js')

const deleteProductsOnClient = async function (options) {
  if (options.all) {
    const params = {
      "select": [
        "id", "iblockId",
        "name",
        "purchasingPrice",
        "previewPicture",
        "detailPicture",
        "price"
      ],
      "filter":{
        "iblockId": options.iblockId
      },
      "start": 1
    }
    const allProductsOnClient = await bitrixApi('post', 'catalog.product.list', params)
    console.log(allProductsOnClient)

    for (const product of allProductsOnClient.result.products) {
      const result = await bitrixApi('post', 'catalog.product.delete', {id: product.id})
      console.log(result)
    }
  }
  else if (options.id) {
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
