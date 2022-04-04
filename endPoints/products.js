const router = require('express').Router()

const getProducts = require('../mongoFunc/products/getProducts.js')
const deleteProducts = require('../mongoFunc/products/deleteProducts.js')
const productIsExist = require('../mongoFunc/products/productIsExist.js')
const createProduct = require('../mongoFunc/products/createProducts.js')
const updateProduct = require('../mongoFunc/products/updateProduct.js')
const getCategorieTree = require('../mongoFunc/products/getCategorieTree.js')
const getProductsByCategorie = require('../mongoFunc/products/getProductsByCategorie.js')
const deployProductsToClient = require('../simpleFunctions/deployProductsToClient.js')
const deployCategoriesToClient = require('../simpleFunctions/deployCategoriesToClient.js')
const deleteCategoriesOnClient = require('../simpleFunctions/deleteCategoriesOnClient.js')
const deleteProductsOnClient = require('../simpleFunctions/deleteProductsOnClient.js')

// begin get all Products
router.get('/', async (req, res) => {
  const allProducts = await getProducts({})
  res.json(allProducts)
})
// end get all Products


// begin get Products by supplier name
router.get('/getProducts/:supplier', async (req, res) => {
  const products = await getProducts({ supplier: req.params.supplier })
  res.json(products)
})
// end get Products by supplier name


// begin update Products db

router.post('/update', async (req, res) => {
  const data = req.body
  const product = data.product

  if (await productIsExist(product.supplier, product)) {
    await updateProduct(product.supplier, product)
  } else {
    await createProduct(product)
  }

  res.sendStatus(200)
})

// end update Products db


// begin get all categories
router.get('/categories/:supplier', async (req, res) => {
  const allProducts = await getProducts({ supplier: req.params.supplier })

  const result = getCategorieTree(allProducts)
  console.log(result)
  res.json(result)
})
// end get all categories


// begin delete Products

router.delete('/', async (req, res) => {
  const data = req.body
  const product = data.product

  await deleteProducts(product.supplier, [product])

  res.sendStatus(200)
})

// end delete Products


// begin get count products on categorie
router.post('/productCount/categorie', async (req, res) => {
  const data = req.body

  const products = await getProductsByCategorie(data.categorieLevel, data.categorieName)

  res.json(products.length)
})
// end get count products on categorie


// begin deploy all products
router.post('/deploy/products', async (req, res) => {
  const data = req.body

  const products = await getProducts({ supplier: data.supplier })

  const result = await deployProductsToClient(products)

  res.json(result)
})
// end deploy all products

router.post('/deploy/categories', async (req, res) => {
  const data = req.body

  const products = await getProducts({ supplier: data.supplier })

  await deployCategoriesToClient(products)

  res.sendStatus(200)
})



router.post('/delete/categoriesOnClient', async (req, res) => {
  const data = req.body

  await deleteCategoriesOnClient(data.options)

  res.sendStatus(200)
})


router.post('/delete/productsOnClient', async (req, res) => {
  const data = req.body

  await deleteProductsOnClient(data.options)

  res.sendStatus(200)
})

module.exports = router
