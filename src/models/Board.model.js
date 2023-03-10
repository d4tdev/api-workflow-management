import Joi from 'joi';
import { getDB } from '../config/mongodb';
import { ObjectId } from 'mongodb';

// Define Board collection schema
const boardCollectionName = 'Boards';
const BoardSchema = Joi.object({
   title: Joi.string().required().min(3).max(20).trim(),
   columnOrder: Joi.array().items(Joi.string()).default([]),
   createdAt: Joi.date().timestamp().default(Date.now()),
   updatedAt: Joi.date().timestamp().default(null),
   _destroy: Joi.boolean().default(false),
});

const validateSchema = async data => {
   return await BoardSchema.validateAsync(data, { abortEarly: false }); // abortEarly: false to return all errors
};

const createNew = async data => {
   try {
      const value = await validateSchema(data);
      const result = await getDB()
         .collection(boardCollectionName)
         .insertOne(value);
      if (result.acknowledged) {
         return await getDB()
            .collection(boardCollectionName)
            .findOne({ _id: result.insertedId });
      }
   } catch (err) {
      throw new Error(err);
   }
};

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
   try {
      const result = await getDB()
         .collection(boardCollectionName)
         .findOneAndUpdate(
            { _id: new ObjectId(boardId) },
            {
               $push: {
                  columnOrder: columnId,
               },
            },
            { returnDocument: 'after' }
         );
      return result.value;
   } catch (err) {
      throw new Error(err);
   }
};

const getABoard = async boardId => {
   try {
      const result = await getDB()
         .collection(boardCollectionName)
         .aggregate([
            { $match: { _id: new ObjectId(boardId) } },
            // {
            //    $addFields: {
            //       _id: { $toString: '$_id' }, // bị trùng id thì sẽ ghi đè (chỉ ghi đè trong QT query, k ảnh hưởng đến dữ liệu), chuyển đổi thành string
            //    },
            // },
            {
               $lookup: {
                  from: 'Columns',
                  localField: '_id',
                  foreignField: 'boardId',
                  as: 'columns',
               },
            },
            {
               $lookup: {
                  from: 'Cards',
                  localField: '_id',
                  foreignField: 'boardId',
                  as: 'cards',
               },
            },
         ])
         .toArray();
      return result[0] || {};
   } catch (err) {
      throw new Error(err);
   }
};

export const BoardModel = { createNew, getABoard, pushColumnOrder };
