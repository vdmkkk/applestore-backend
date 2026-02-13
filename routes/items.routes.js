const Router = require('express')
const router = new Router()
const itemsController = require('../controller/items.controller')

router.post('/items', itemsController.createItem)
router.get('/items', itemsController.getItems)
router.get('/items/:id', itemsController.getOneItem)
router.put('/items', itemsController.updateItem)
router.delete('/items/:id', itemsController.deleteItem)
router.get('/items/find/:id', itemsController.findCategory)


module.exports = router