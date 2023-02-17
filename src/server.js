import express from "express";
import {config} from 'dotenv';
config();

const app = express();
const hostname = 'localhost';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`)
});
