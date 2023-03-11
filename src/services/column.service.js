import { ColumnModel } from '../models/column.model';
import { BoardModel } from '../models/Board.model';

const createNew = async data => {
   try {
      // Sử dụng transaction mongodb
      const newColumn = await ColumnModel.createNew(data);

      // Update columnOrder Array in Board collection
      await BoardModel.pushColumnOrder(newColumn.boardId.toString(), newColumn._id.toString());

      return newColumn;
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
