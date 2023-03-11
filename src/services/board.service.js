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
      if (!board || !board.columns) throw new Error('Board not found!');

      // Add card to each column
      board.columns.forEach(column => {
         column.cards = board.cards.filter(
            card => card.columnId.toString() === column._id.toString()
         ); // Luôn trả về Array
      });

      // Sort columns by columnOrder, sort cards by cardOrder (handle in FE side)

      delete board.cards; // Xóa thuộc tính cards khỏi board

      return board;
   } catch (err) {
      throw new Error(err);
   }
};

export const BoardService = { createNew, getABoard };
