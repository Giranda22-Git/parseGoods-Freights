const bitrixApi = require('./bitrixApi.js')

const deleteCategoriesOnClient = async function (options) {
  if (options.id) {
    const result = await bitrixApi('post', 'catalog.section.delete', {iblockId: options.iblockId, id: options.id})
    console.log(result)
  } else {
    for (let index = options.from; index <= options.to; index++) {
      const result = await bitrixApi('post', 'catalog.section.delete', {iblockId: options.iblockId, id: index})
      console.log(result)
    }
  }
}

module.exports = deleteCategoriesOnClient
