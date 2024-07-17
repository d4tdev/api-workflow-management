const express = require('express')
const router = express.Router()

const { boardRouter } = require('./board.route')
const { cardRouter } = require('./card.route')
const { columnRouter } = require('./column.route')
const { authRouter } = require('./auth.route')

router.use('/auth', authRouter)
router.use('/boards', boardRouter)
router.use('/columns', columnRouter)
router.use('/cards', cardRouter)
router.get('/', (req, res) => {
   res.status(200).json({ status: 'OK' })
})

module.exports = { apiV1: router }
