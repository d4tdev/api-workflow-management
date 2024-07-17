const Joi = require('joi')
const { HttpStatusCode } = require('../utilities/constants')

const createNew = async (req, res, next) => {
   const condition = Joi.object({
      boardId: Joi.string().required(),
      title: Joi.string().required().min(3).max(20).trim(),
   })
   try {
      await condition.validateAsync(req.body, { abortEarly: false })
      next()
   } catch (err) {
      console.log(err)
      res.status(HttpStatusCode.BAD_REQUEST).json({
         errors: new Error(err).message,
      })
   }
}

const updateOne = async (req, res, next) => {
   const condition = Joi.object({
      title: Joi.string().min(3).max(20).trim(),
   })
   try {
      await condition.validateAsync(req.body, {
         abortEarly: false,
         allowUnknown: true, // allow unknown keys that will be ignored
      })
      next()
   } catch (err) {
      console.log(err)
      res.status(HttpStatusCode.BAD_REQUEST).json({
         errors: new Error(err).message,
      })
   }
}
const ColumnValidation = { createNew, updateOne }
module.exports = ColumnValidation
