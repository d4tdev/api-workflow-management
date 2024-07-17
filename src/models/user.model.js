const Joi = require('joi')
const { ObjectId } = require('mongodb')
const { getDB } = require('../config/mongodb')

// Define User collection schema
const userCollectionName = 'Users'
const UserSchema = Joi.object({
   username: Joi.string().required().min(5).max(20).trim(),
   password: Joi.string().required().trim(),
   boardOrder: Joi.array().items(Joi.string().trim()).default([]),
   createdAt: Joi.date().timestamp().default(Date.now()),
   updatedAt: Joi.date().timestamp().default(null),
   _destroy: Joi.boolean().default(false),
})
const validateSchema = async (data) => {
   return await UserSchema.validateAsync(data, { abortEarly: false }) // abortEarly: false to return all errors
}

const createNew = async (data) => {
   try {
      const value = await validateSchema(data)
      const result = await getDB()
         .collection(userCollectionName)
         .insertOne(value)
      if (result.acknowledged) {
         return await getDB()
            .collection(userCollectionName)
            .findOne({ _id: result.insertedId })
      }
   } catch (error) {
      throw new Error(error)
   }
}

const findByUsername = async (username) => {
   try {
      const result = await getDB().collection(userCollectionName).findOne({
         username,
      })
      return result
   } catch (error) {
      throw new Error(error)
   }
}

const findById = async (userId) => {
   try {
      const result = await getDB()
         .collection(userCollectionName)
         .findOne({ _id: new ObjectId(userId) })
      if (result.password) delete result.password // delete password field (not necessary

      return result
   } catch (error) {
      throw new Error(error)
   }
}

const pushBoardOrder = async (userId, boardId) => {
   try {
      const result = await getDB()
         .collection(userCollectionName)
         .findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $push: { boardOrder: boardId } },
            { returnDocument: 'after' } // trả về document sau khi update
         )
      return result.value
   } catch (error) {
      throw new Error(error)
   }
}

const UserModel = {
   createNew,
   findByUsername,
   pushBoardOrder,
   findById,
}

module.exports = UserModel
