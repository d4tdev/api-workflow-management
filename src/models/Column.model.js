import Joi from 'joi';
import { getDB } from '../config/mongodb';

// Define Board collection schema
const columnCollectionName = 'Columns';
const ColumnSchema = Joi.object({
   boardId: Joi.string().required(),
   title: Joi.string().required().min(3).max(20),
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
      return result;
   } catch (err) {
      console.log(err);
   }
};

export const ColumnModel = { createNew };
