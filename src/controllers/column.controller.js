import { ColumnService } from '../services/column.service';
import { HttpStatusCode } from '../utilities/constants';

export default new (class ColumnController {
   createNew = async (req, res) => {
      try {
         const result = await ColumnService.createNew(req.body);

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
         const result = await ColumnService.updateOne(id, req.body);

         res.status(HttpStatusCode.CREATED).json(result);
      } catch (err) {
         console.log(err);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            errors: err.message,
         });
      }
   };
})();
