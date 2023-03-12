import Joi from 'joi';
import { HttpStatusCode } from '../utilities/constants';

const createNew = async (req, res, next) => {
   const condition = Joi.object({
      boardId: Joi.string().required(),
      columnId: Joi.string().required(),
      title: Joi.string().required().min(3).max(40).trim(),
   });
   try {
      await condition.validateAsync(req.body, { abortEarly: false });
      next();
   } catch (err) {
      console.log(err);
      res.status(HttpStatusCode.BAD_REQUEST).json({
         errors: new Error(err).message,
      });
   }
};

export const CardValidation = { createNew };
