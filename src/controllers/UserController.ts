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

    async delete(request: Request, response: Response){
        const userDelete = getCustomRepository(UsersRepositories);
        const { id } = request.params;
        const userAlreadyExists = await userDelete.findOne(id);
        if(userAlreadyExists){
            userDelete.remove(userAlreadyExists);
            return response.status(200).send({ message: "User deleted successfuylly" })
        }
        
        return response.status(400).send({ message: "error" });
    }

    async update(request: Request, response: Response){
        const { id } = request.params;
        
        const { name, email, password } = request.body;

        const userService = new UserService();

        const result = await userService.execute({ id, name, email, password});

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.json(result)
    }
}

export { UserController }