import express from 'express';
import { connectDB } from './config/mongodb';
import { env } from '*/config/environment';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { corsOptions } from './config/cors';
import { routes } from './routes';

const hostname = env.HOSTNAME;
const port = env.PORT;

connectDB()
   .then(() => bootServer())
   .catch((err) => {
      console.log(err);
      process.exit(1);
   });

const bootServer = () => {
   const app = express();

   app.use(cookieParser());
   app.use(cors(corsOptions));
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   routes(app);

   app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
   });
};
