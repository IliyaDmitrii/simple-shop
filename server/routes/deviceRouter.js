const Router = require('express')
const deviceController = require('../controllers/deviceController')
const router = new Router()

router.post('/',deviceController.createDevice)
router.get('/',deviceController.getAllDevice)
router.get('/:id',deviceController.getOneDevice)

module.exports = router
