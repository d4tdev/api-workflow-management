import { BoardModel } from '../models/board.model';
import { UserModel } from '../models/User.model';
import { cloneDeep } from 'lodash';
import { ColumnService } from './column.service';

const createNew = async (data) => {
   try {
      const newBoard = await BoardModel.createNew(data);

      // Update boardOrder Array in User collection
      await UserModel.pushBoardOrder(
         newBoard.userId.toString(),
         newBoard._id.toString()
      );

      return newBoard;
   } catch (err) {
      throw new Error(err);
   }
};
const getABoard = async (boardId) => {
   try {
      const board = await BoardModel.getABoard(boardId);
      if (!board || !board.columns) throw new Error('Board not found!');

      const transformBoard = cloneDeep(board); // Clone board
      // Filter deleted columns
      transformBoard.columns = transformBoard.columns.filter(
         (column) => !column._destroy
      );

      // Add card to each column
      transformBoard.columns.forEach((column) => {
         column.cards = transformBoard.cards.filter(
            (card) => card.columnId.toString() === column._id.toString()
         );
      });

      // Sort columns by columnOrder, sort cards by cardOrder (handle in FE side)

      delete transformBoard.cards; // Xóa thuộc tính cards khỏi board

      return transformBoard;
   } catch (err) {
      throw new Error(err);
   }
};

const updateOne = async (id, data) => {
   try {
      const updateData = { ...data, updatedAt: Date.now() };
      if (updateData._id) delete updateData._id;
      if (updateData.columns) delete updateData.columns;

      const updatedBoard = await BoardModel.updateOne(id, updateData);

      if (updatedBoard.data._destroy) {
         // get all the columns of the board
         for (const column of updatedBoard.data.columnOrder) {
            await ColumnService.updateOne(column, { _destroy: true });
         }
      }

      return updatedBoard;
   } catch (err) {
      throw new Error(err);
   }
};

const getAllBoards = async (userId) => {
   try {
      const boards = await BoardModel.getAllBoards(userId);
      return boards;
   } catch (err) {
      throw new Error(err);
   }
};

const getDeletedBoards = async (userId) => {
   try {
      const boards = await BoardModel.getDeletedBoards(userId);
      return boards;
   } catch (err) {
      throw new Error(err);
   }
};

export const BoardService = {
   createNew,
   getABoard,
   updateOne,
   getAllBoards,
   getDeletedBoards,
};
