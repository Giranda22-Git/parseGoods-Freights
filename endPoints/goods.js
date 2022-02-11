const router = require('express').Router()

const getGoods = require('../mongoFunc/goods/getGoods.js')
const parseGoods = require('../mongoFunc/goods/parseGoods.js')
const deleteGoods = require('../mongoFunc/goods/deleteGoods.js')

// begin get all goods
router.get('/', async (req, res) => {
  const allGoods = await getGoods({})
  res.json(allGoods)
})
// end get all goods


// begin update goods db

router.post('/update', async (req, res) => {
  const listOfNewProducts = await parseGoods()

  res.json({
    message: `добавлено ${listOfNewProducts.length} новых товаров`,
    code: 200,
    stringCode: "OK"
  })
})

// end update goods db


// begin delete goods

router.delete('/', async (req, res) => {
  const count = req.body.count
  const allGoods = await getGoods({})

  const listOfDeletedGoods = await deleteGoods(allGoods, count)

  res.json({
    message: `удалено ${listOfDeletedGoods.length} товаров`,
    code: 200,
    stringCode: "OK"
  })
})

// end delete goods

module.exports = router
