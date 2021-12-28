import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

class UserController{
    async handle(request: Request, response: Response){
        const { name, email, password } = request.body;

        const userService = new UserService();

        const user = await userService.execute({ name, email, password});

        return response.json(user);
    }
}

export { UserController }