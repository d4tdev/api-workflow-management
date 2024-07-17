const express = require('express')
const router = express.Router()

const CardController = require('../../controllers/card.controller')
const CardValidation = require('../../validations/card.validation')
const { verifyToken } = require('../../middlewares/auth.middleware')

router
   .route('/')
   .post(verifyToken, CardValidation.createNew, CardController.createNew)
router
   .route('/:id')
   .put(verifyToken, CardValidation.updateOne, CardController.updateOne)

module.exports = { cardRouter: router }
