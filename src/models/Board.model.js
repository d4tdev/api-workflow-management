import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/mongodb';

// Define Board collection schema
const boardCollectionName = 'Boards';
const BoardSchema = Joi.object({
   userId: Joi.string().required().trim(),
   title: Joi.string().required().min(3).max(20).trim(),
   columnOrder: Joi.array().items(Joi.string()).default([]),
   createdAt: Joi.date().timestamp().default(Date.now()),
   updatedAt: Joi.date().timestamp().default(null),
   _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
   return await BoardSchema.validateAsync(data, { abortEarly: false }); // abortEarly: false to return all errors
};

const createNew = async (data) => {
   try {
      const value = await validateSchema(data);
      const newValue = {
         ...value,
      };
      if (value.userId) newValue.userId = new ObjectId(value.userId);

      const result = await getDB()
         .collection(boardCollectionName)
         .insertOne(newValue);
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
 * It takes a boardId and a columnId, and pushes the columnId into the columnOrder array of the board
 * with the given boardId.
 * @param {string} boardId - the id of the board you want to update
 * @param {string} columnId - the id of the column to be added to the columnOrder array
 * @returns The result of the update operation.
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
            { returnDocument: 'after' } // trả về document sau khi update
         );
      return result.value;
   } catch (err) {
      throw new Error(err);
   }
};

const getABoard = async (boardId) => {
   try {
      const result = await getDB()
         .collection(boardCollectionName)
         .aggregate([
            {
               $match: { _id: new ObjectId(boardId), _destroy: false },
            },
            /*{ // Cách 1:
               $addFields: { // Add thêm field mới lúc query, nếu trùng thì ghi đè lại field cũ
                  _id: { $toString: '$_id'} // Chuyển đổi _id từ ObjectId sang String
               }
            },*/
            {
               $lookup: {
                  from: 'Columns', // Tên collection cần join
                  localField: '_id', // Tên field của collection hiện tại
                  foreignField: 'boardId', // Tên field của collection cần join
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
         .toArray(); // Trả về mảng

      return result[0] || {};
   } catch (err) {
      throw new Error(err);
   }
};

const updateOne = async (id, data) => {
   try {
      const newData = { ...data };
      if (data.userId) newData.userId = new ObjectId(data.userId);

      const result = await getDB()
         .collection(boardCollectionName)
         .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: newData },
            { returnDocument: 'after' } // trả về document sau khi update
         );
      return { status: 'Update success', data: result.value };
   } catch (err) {
      throw new Error(err);
   }
};

const getAllBoards = async (userId) => {
   try {
      const result = await getDB()
         .collection(boardCollectionName)
         .find({ userId: new ObjectId(userId), _destroy: false })
         .toArray();
      return result || [];
   } catch (err) {
      throw new Error(err);
   }
};

const getDeletedBoards = async (userId) => {
   try {
      const result = await getDB()
         .collection(boardCollectionName)
         .find({ userId: new ObjectId(userId), _destroy: true })
         .toArray();
      return result || [];
   } catch (err) {
      throw new Error(err);
   }
};

export const BoardModel = {
   createNew,
   getABoard,
   pushColumnOrder,
   updateOne,
   getAllBoards,
   getDeletedBoards,
};
