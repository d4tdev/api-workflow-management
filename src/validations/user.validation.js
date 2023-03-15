import Joi from 'joi';
import { HttpStatusCode } from '../utilities/constants';

const createNew = async (req, res, next) => {
   const condition = Joi.object({
      username: Joi.string().required().min(5).max(20).trim(),
      password: Joi.string().required().min(6).max(20).trim()
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

export const UserValidation = { createNew };
