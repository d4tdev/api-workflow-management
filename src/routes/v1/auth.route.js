const express = require('express')
const router = express.Router()

const AuthController = require('../../controllers/auth.controller')
const AuthValidation = require('../../validations/auth.validation')
const { verifyToken } = require('../../middlewares/auth.middleware')

router.route('/register').post(AuthValidation.register, AuthController.register)
router.route('/login').post(AuthValidation.login, AuthController.login)
router.route('/').get(verifyToken, AuthController.getUserInfo)

module.exports = { authRouter: router }
