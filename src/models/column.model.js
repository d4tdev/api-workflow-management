const Joi = require('joi')
const { ObjectId } = require('mongodb')
const { getDB } = require('../config/mongodb')

// Define Board collection schema
const columnCollectionName = 'Columns'
const ColumnSchema = Joi.object({
   boardId: Joi.string().required(), // Also ObjectId when create new
   title: Joi.string().required().min(3).max(20).trim(),
   cardOrder: Joi.array().items(Joi.string()).default([]),
   createdAt: Joi.date().timestamp().default(Date.now()),
   updatedAt: Joi.date().timestamp().default(null),
   _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
   return await ColumnSchema.validateAsync(data, { abortEarly: false }) // abortEarly: false to return all errors
}

const createNew = async (data) => {
   try {
      const value = await validateSchema(data)

      const newValue = {
         ...value,
      }
      if (value.boardId) newValue.boardId = new ObjectId(value.boardId) // Chuyển đổi boardId từ String sang ObjectId

      const result = await getDB()
         .collection(columnCollectionName)
         .insertOne(newValue)

      if (result.acknowledged) {
         return await getDB()
            .collection(columnCollectionName)
            .findOne({ _id: result.insertedId })
      }
   } catch (err) {
      throw new Error(err)
   }
}

/**
 *
 * @param {string} cardId
 * @param {string} columnId
 */
const pushCardOrder = async (columnId, cardId) => {
   try {
      const result = await getDB()
         .collection(columnCollectionName)
         .findOneAndUpdate(
            { _id: new ObjectId(columnId) },
            {
               $push: {
                  cardOrder: cardId,
               },
            },
            { returnDocument: 'after' } // trả về document sau khi update
         )
      return result.value
   } catch (err) {
      throw new Error(err)
   }
}

const updateOne = async (id, data) => {
   try {
      const newData = { ...data }
      if (data.boardId) newData.boardId = new ObjectId(data.boardId)

      const result = await getDB()
         .collection(columnCollectionName)
         .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: newData },
            { returnDocument: 'after' } // trả về document sau khi update
         )
      return { status: 'Update success', data: result.value }
   } catch (err) {
      throw new Error(err)
   }
}

/**
 * @param {Array of string card id} ids
 */
const updateMany = async (ids, data) => {
   try {
      const transformIds = ids.map((id) => new ObjectId(id))
      const result = await getDB()
         .collection(columnCollectionName)
         .updateMany(
            {
               _id: { $in: transformIds },
            },
            { $set: data }
         )

      return result
   } catch (err) {
      throw new Error(err)
   }
}

const ColumnModel = {
   createNew,
   updateOne,
   pushCardOrder,
   updateMany,
}

module.exports = ColumnModel
