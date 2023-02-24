import express from 'express';
import { connectDB } from './config/mongodb';
import { env } from '*/config/environment';

import { routes } from './routes';

const hostname = env.HOSTNAME;
const port = env.PORT;

connectDB()
   .then(() => bootServer())
   .catch(err => {
      console.log(err);
      process.exit(1);
   });

const bootServer = () => {
   const app = express();

   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   routes(app);

   app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
   });
};
