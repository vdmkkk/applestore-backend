const Router = require('express')
const router = new Router()
const kassaController = require('../controller/kassa.controller')

router.get('/kassa/notif', kassaController.notif)
router.get('/kassa/get', kassaController.getData)
router.get('/kassa/success', kassaController.success)
router.get('/kassa/fail', kassaController.failure)

module.exports = router