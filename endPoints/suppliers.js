const router = require('express').Router()

const createSupplier = require('../mongoFunc/suppliers/createSupplier.js')
const getSuppliers = require('../mongoFunc/suppliers/getSuppliers.js')

// begin get all suppliers
router.get('/', async (req, res) => {
  const allSuppliers = await getSuppliers({})
  res.json(allSuppliers)
})
// end get all suppliers


// begin create supplier

router.post('/', async (req, res) => {
  const data = req.body

  const newSupplier = await createSupplier(data)

  res.json(newSupplier)
})

// end create supplier

module.exports = router
