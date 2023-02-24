import { BoardModel } from '../models/board.model';

const createNew = async data => {
   try {
      const result = await BoardModel.createNew(data);
      return result;
   } catch (err) {
      throw new Error(err);
   }
};

export const BoardService = { createNew };
