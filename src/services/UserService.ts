import { response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { ErrorsUser } from '../errors/ErrorsUser'

interface IUserProps {
    name: string;
    email: string;
    password: string;
}

class UserService{
    async execute({name, email, password}: IUserProps){
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email){
            throw new ErrorsUser("email incorrect!");
        }

        const userAlreadtExist = await usersRepository.findOne({
            email,
        });

        if(userAlreadtExist){
            throw new ErrorsUser("User already exists!");
        }

        const user = usersRepository.create({
            name,
            email,
            password
        });

        await usersRepository.save(user);

        return user;
    }
}

export { UserService }