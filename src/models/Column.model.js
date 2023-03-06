import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/mongodb';

// Define Board collection schema
const columnCollectionName = 'Columns';
const ColumnSchema = Joi.object({
   boardId: Joi.string().required(),
   title: Joi.string().required().min(3).max(20).trim(),
   cardOrder: Joi.array().items(Joi.string()).default([]),
   createdAt: Joi.date().timestamp().default(Date.now()),
   updatedAt: Joi.date().timestamp().default(null),
   _destroy: Joi.boolean().default(false),
});

const validateSchema = async data => {
   return await ColumnSchema.validateAsync(data, { abortEarly: false }); // abortEarly: false to return all errors
};

const createNew = async data => {
   try {
      const value = await validateSchema(data);
      const result = await getDB()
         .collection(columnCollectionName)
         .insertOne(value);
      if (result.acknowledged) {
         return await getDB()
            .collection(columnCollectionName)
            .findOne({ _id: result.insertedId });
      }
   } catch (err) {
      throw new Error(err);
   }
};

const updateOne = async (id, data) => {
   try {
      const result = await getDB()
         .collection(columnCollectionName)
         .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: data },
            { returnDocument: 'after' } // trả về document sau khi update
         );
      return { status: 'Update success', data: result.value };
   } catch (err) {
      throw new Error(err);
   }
};

export const ColumnModel = { createNew, updateOne };
