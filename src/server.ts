import "reflect-metadata";
import express from 'express';

import './database';

const app = express();

app.use(express.json())

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running");
})