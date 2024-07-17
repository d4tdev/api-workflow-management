const express = require('express')
const router = express.Router()

const ColumnController = require('../../controllers/column.controller')
const ColumnValidation = require('../../validations/column.validation')
const { verifyToken } = require('../../middlewares/auth.middleware')

router
   .route('/')
   .post(verifyToken, ColumnValidation.createNew, ColumnController.createNew)
router
   .route('/:id')
   .put(verifyToken, ColumnValidation.updateOne, ColumnController.updateOne)

module.exports = { columnRouter: router }
