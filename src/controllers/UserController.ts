import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';

class UserController{
    async handle(request: Request, response: Response){
        const { name, email, password } = request.body;

        const userService = new UserService();

        const user = await userService.execute({ name, email, password });

        return response.json(user);
    }

    async show(request: Request, response: Response){
        const { id } = request.params;

        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOneOrFail(id);

        return response.json(user);
    }
}

export { UserController }