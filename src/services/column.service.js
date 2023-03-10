import { ColumnModel } from '../models/column.model';
import { BoardModel } from '../models/board.model';

const createNew = async data => {
   try {
      const result = await ColumnModel.createNew(data);

      // update columnOrder array in Board collection
      const updatedBoard = await BoardModel.pushColumnOrder(result.boardId.toString(), result._id.toString());

      return updatedBoard;
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
