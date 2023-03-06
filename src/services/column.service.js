import { ColumnModel } from '../models/column.model';

const createNew = async data => {
   try {
      const result = await ColumnModel.createNew(data);
      return result;
   } catch (err) {
      throw new Error(err);
   }
};

const updateOne = async (id, data) => {
   try {
      const updateData = { ...data, updatedAt: Date.now() };
      const result = await ColumnModel.updateOne(id, updateData);
      return result;
   } catch (err) {
      throw new Error(err);
   }
};

export const ColumnService = { createNew, updateOne };
