const getProducts = require('./getProducts.js')

const getProductsByCategorie = async function (categorieLevel, categorieName) {
  const products = await getProducts({})

  const filteredProducts = products.filter(product => {
    return product.categories[categorieLevel] === categorieName
  })

  return filteredProducts
}

module.exports = getProductsByCategorie
