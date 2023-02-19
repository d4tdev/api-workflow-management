import express from 'express';
import { connectDB } from './config/mongodb';
import { env } from './config/environment';

const app = express();
const hostname = env.HOSTNAME;
const port = env.PORT;

connectDB();

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});
