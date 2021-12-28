import "reflect-metadata";
import express from 'express';

import { router } from './routes/routes';

import './database';

const app = express();

app.use(express.json());

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running");
})