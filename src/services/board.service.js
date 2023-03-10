import { BoardModel } from '../models/board.model';

const createNew = async data => {
   try {
      const result = await BoardModel.createNew(data);
      return result;
   } catch (err) {
      throw new Error(err);
   }
};

const getABoard = async boardId => {
   try {
      const board = await BoardModel.getABoard(boardId);

      // Add card to each column
      board.columns.forEach(column => {
         column.cards = board.cards.filter(
            card => card.columnId.toString() === column._id.toString()
         );
      });

      // Sort columns by column Order, sort cards by column Order (passed in FE)

      // Remove card data from boards
      delete board.cards;

      return board;
   } catch (err) {
      throw new Error(err);
   }
};

export const BoardService = { createNew, getABoard };
