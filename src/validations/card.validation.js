const Joi = require('joi')
const { HttpStatusCode } = require('../utilities/constants')

const createNew = async (req, res, next) => {
   const condition = Joi.object({
      boardId: Joi.string().required(),
      columnId: Joi.string().required(),
      title: Joi.string().required().min(3).max(40).trim(),
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
      title: Joi.string().min(3).max(30).trim(),
      boardId: Joi.string(),
      columnId: Joi.string(),
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
const CardValidation = { createNew, updateOne }
module.exports = CardValidation
