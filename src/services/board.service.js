import { BoardModel } from '../models/board.model';
import { cloneDeep } from 'lodash';

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
      if (!board || !board.columns) throw new Error('Board not found!');

      const transformBoard = cloneDeep(board); // Clone board
      // Filter deleted columns
      transformBoard.columns = transformBoard.columns.filter(
         column => !column._destroy
      );

      // Add card to each column
      transformBoard.columns.forEach(column => {
         column.cards = transformBoard.cards.filter(
            card => card.columnId.toString() === column._id.toString()
         );
      });

      // Sort columns by columnOrder, sort cards by cardOrder (handle in FE side)

      delete transformBoard.cards; // Xóa thuộc tính cards khỏi board

      return transformBoard;
   } catch (err) {
      throw new Error(err);
   }
};

export const BoardService = { createNew, getABoard };
