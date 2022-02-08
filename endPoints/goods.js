const router = require('express').Router()

const getGoods = require('../mongoFunc/goods/getGoods.js')

// begin get all goods
router.get('/', async (req, res) => {
  const allGoods = await getGoods({})
  res.json(allGoods)
})
// end get all goods

module.exports = router
