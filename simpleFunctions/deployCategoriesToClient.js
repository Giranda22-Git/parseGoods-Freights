const bitrixApi = require('./bitrixApi.js')
const getBitrixCategorie = require('../mongoFunc/bitrixCategories/getBitrixCategorie.js')
const createBitrixCategorie = require('../mongoFunc/bitrixCategories/createBitrixCategorie.js')
const settings = require('../staticData/mountedData.js').data

const deployCategoriesToClient = async function (products, iblockId) {
  for (const product of products) {
    for (const [index, categorieName] of product.categories.entries()) {
      const targetBitrixCategorie = await getBitrixCategorie({
        iblockId,
        supplier: product.supplier,
        name: categorieName,
        categorieLevel: index
      })

      if (!targetBitrixCategorie) {
        const targetParentBitrixCategorie = await getBitrixCategorie({
          iblockId,
          supplier: product.supplier,
          name: product.categories?.[index - 1],
          categorieLevel: index - 1
        })

        let iblockSectionId = null

        if (targetParentBitrixCategorie) {
          iblockSectionId = targetParentBitrixCategorie.id
        }

        const newSectionParams = {
          fields: {
            code: makeid(25),
            iblockId,
            iblockSectionId,
            name: categorieName
          }
        }

        const newSectionResponseBody = (await bitrixApi('post', 'catalog.section.add', newSectionParams)).result.section
        console.log(newSectionResponseBody)


        const newBitrixCategorieData = {
          code: newSectionResponseBody.code,
          iblockId: newSectionResponseBody.iblockId,
          iblockSectionId: newSectionResponseBody?.iblockSectionId,
          id: newSectionResponseBody.id,
          name: newSectionResponseBody.name,
          supplier: product.supplier,
          categorieLevel: index
        }

        const newBitrixCategorieResponseBody = await createBitrixCategorie(newBitrixCategorieData)
        console.log(newBitrixCategorieResponseBody)
      }
    }
  }
}

module.exports = deployCategoriesToClient

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}

// code: 
// iblockId: 
// iblockSectionId: 
// id: 
// name: 
// supplier: 
// categorieLevel: 
