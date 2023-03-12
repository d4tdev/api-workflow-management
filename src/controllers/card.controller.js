import { CardService } from '../services/card.service';
import { HttpStatusCode } from '../utilities/constants';

export default new (class CardController {
   createNew = async (req, res) => {
      try {
         const result = await CardService.createNew(req.body);

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
         const result = await CardService.updateOne(id, req.body);

         res.status(HttpStatusCode.CREATED).json(result);
      } catch (err) {
         console.log(err);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            errors: err.message,
         });
      }
   };
})();
