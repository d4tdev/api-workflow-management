import { BoardService } from '../services/board.service';
import { HttpStatusCode } from '../utilities/constants';

export default new (class BoardController {
   createNew = async (req, res) => {
      try {
         const result = await BoardService.createNew(req.body);

         res.status(HttpStatusCode.CREATED).json({
            data: result,
         });
      } catch (err) {
         console.log(err);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            errors: err.message,
         });
      }
   };
})();
