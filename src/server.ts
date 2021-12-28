import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { router } from './routes/routes';
import { ErrorsUser } from './errors/ErrorsUser';

import './database';

const app = express();

app.use(express.json());

app.use(router);
app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof ErrorsUser){
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`,
    });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running");
})