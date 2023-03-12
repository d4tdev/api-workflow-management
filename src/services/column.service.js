import { ColumnModel } from '../models/column.model';
import { BoardModel } from '../models/Board.model';
import { CardModel } from '../models/Card.model';

const createNew = async data => {
   try {
      // Sử dụng transaction mongodb
      const newColumn = await ColumnModel.createNew(data);
      newColumn.cards = [];

      // Update columnOrder Array in Board collection
      await BoardModel.pushColumnOrder(
         newColumn.boardId.toString(),
         newColumn._id.toString()
      );

      return newColumn;
   } catch (err) {
      throw new Error(err);
   }
};

const updateOne = async (id, data) => {
   try {
      const updateData = { ...data, updatedAt: Date.now() };
      if (updateData._id) delete updateData._id;
      if (updateData.cards) delete updateData.cards;
      const updatedColumn = await ColumnModel.updateOne(id, updateData);

      if (updatedColumn.data._destroy)
         await CardModel.updateMany(updatedColumn.data.cardOrder);

      return updatedColumn;
   } catch (err) {
      throw new Error(err);
   }
};

export const ColumnService = { createNew, updateOne };
