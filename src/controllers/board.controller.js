import { BoardService } from '../services/board.service';
import { HttpStatusCode } from '../utilities/constants';

export default new (class BoardController {
   createNew = async (req, res) => {
      try {
         req.body.userId = req.userId;
         const result = await BoardService.createNew(req.body);

         res.status(HttpStatusCode.CREATED).json(result);
      } catch (err) {
         console.log(err);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            errors: err.message,
         });
      }
   };

   getABoard = async (req, res) => {
      try {
         const { id } = req.params;
         const result = await BoardService.getABoard(id);

         res.status(HttpStatusCode.CREATED).json(result);
      } catch (err) {
         console.log(err);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            errors: err.message,
         });
      }
   };

   updateOne = async (req, res) => {
      try {
         const { id } = req.params;
         const result = await BoardService.updateOne(id, req.body);

         res.status(HttpStatusCode.CREATED).json(result);
         // res.status(HttpStatusCode.UNAUTHORIZED).json({ statusbar: 'error' });
      } catch (err) {
         console.log(err);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            errors: err.message,
         });
      }
   };

   getAllBoards = async (req, res) => {
      try {
         const result = await BoardService.getAllBoards(req.userId);

         res.status(HttpStatusCode.CREATED).json(result);
      } catch (err) {
         console.log(err);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            errors: err.message,
         });
      }
   };

   getDeletedBoards = async (req, res) => {
      try {
         const result = await BoardService.getDeletedBoards(req.userId);

         res.status(HttpStatusCode.CREATED).json(result);
      } catch (err) {
         console.log(err);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            errors: err.message,
         });
      }
   };
})();
