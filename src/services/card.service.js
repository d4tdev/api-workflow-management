import { CardModel } from '../models/card.model';
import { ColumnModel } from '../models/column.model';

const createNew = async data => {
   try {
      const result = await CardModel.createNew(data);

      // update cardOrder array in Column collection
      const updatedColumn = await ColumnModel.pushCardOrder(
         result.columnId.toString(),
         result._id.toString()
      );

      return updatedColumn;
   } catch (err) {
      throw new Error(err);
   }
};

export const CardService = { createNew };
