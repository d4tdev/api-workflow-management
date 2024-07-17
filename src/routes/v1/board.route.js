const express = require('express')
const router = express.Router()

const BoardController = require('../../controllers/board.controller')
const BoardValidation = require('../../validations/board.validation')
const { verifyToken } = require('../../middlewares/auth.middleware')

router
   .route('/')
   .post(verifyToken, BoardValidation.createNew, BoardController.createNew)
   .get(verifyToken, BoardController.getAllBoards)
router.route('/deleted').get(verifyToken, BoardController.getDeletedBoards)
router
   .route('/:id')
   .get(verifyToken, BoardController.getABoard)
   .put(verifyToken, BoardValidation.updateOne, BoardController.updateOne)

module.exports = { boardRouter: router }
