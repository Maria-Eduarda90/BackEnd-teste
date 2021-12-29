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
        
        return response.status(200).send({ message: "error" });
    }
}

export { UserController }