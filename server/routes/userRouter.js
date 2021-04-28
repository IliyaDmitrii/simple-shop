const Router = require('express')
const router = new Router()
const {check} = require('express-validator')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration',check('email','Introdu corect emailul').isEmail().notEmpty().isLength({min:5,max:255}),userController.registration)
router.post('/login',userController.login)
router.get('/auth' ,authMiddleware,userController.check)

module.exports = router
