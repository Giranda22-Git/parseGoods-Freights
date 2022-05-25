const bitrixApi = require('./bitrixApi.js')
const getBitrixCategorie = require('../mongoFunc/bitrixCategories/getBitrixCategorie.js')
const getPropertyIdFromClient = require('./getPropertyIdFromClient.js')
const axios = require('axios').default
const settings = require('../staticData/mountedData.js').data

const deployProductsToClient = async function (products, iblockId) {
  for (const product of products) {
    const targetBitrixCategorie = await getBitrixCategorie({
      iblockId,
      supplier: product.supplier,
      name: product.categories[product.categories.length - 1],
      categorieLevel: product.categories.length - 1
    })

    const img = await getImgBase64(product.images[0])

    let params = {
      fields: {
        iblockId,
        iblockSectionId: targetBitrixCategorie.id,
        name: product.productName,
        purchasingCurrency: 'KZT',
        purchasingPrice: product.dealerPrice.replaceAll(' ', '').replace('KZT', ''),
        detailText: product.description,
        previewPicture: {fileData: [makeid(10) + '.jpeg', img]},
        detailPicture: {fileData: [makeid(10) + '.jpeg', img]},
        code: makeid(25),
        quantityTrace: 'N',
        quantity: 5
      }
    }

    params = await collectionOfProperties(product, params, iblockId)

    console.log(params)

    const result = await bitrixApi('post', 'catalog.product.add', params)
    console.log(result)
    const priceParams = {
      fields: {
        product: {
          id: result.result.element.id,
          prices: {
            price: {
              catalogGroupId: 1,
              currency: 'KZT',
              price: product.RRP.replaceAll(' ', '').replace('KZT', '')
            }
          }
        }
      }
    }
    await bitrixApi('post', 'catalog.price.modify', priceParams)
  }
  return true
}

module.exports = deployProductsToClient

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}

async function getImgBase64 (url) {
  try {
    const img = Buffer.from((await axios.get(url, {responseType: 'arraybuffer', timeout: 2000})).data).toString('base64')
    return img
  }
  catch (err) {
    console.log('Повторная попытка загрузки изображения')
    return await getImgBase64(url)
  }
}

async function collectionOfProperties (product, params, iblockId) {
  const resultParams = params

  console.log('debug: ', resultParams)

  if (product.properties) {
    for (const key in product.properties) {
      const propertyId = await getPropertyIdFromClient(key, iblockId)

      resultParams.fields['property' + propertyId] = {
        value: product.properties[key]
      }
    }
  }

  return resultParams
}
