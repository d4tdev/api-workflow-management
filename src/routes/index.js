import { apiV1 } from './v1';

export const routes = app => {
   app.use('/v1', apiV1);
};
