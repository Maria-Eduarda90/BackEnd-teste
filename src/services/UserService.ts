import { response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserProps {
    name: string;
    email: string;
    password: string;
}

class UserService{
    async execute({name, email, password}: IUserProps){
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email){
            return response.status(200).json({ message: "email incorrect" });
        }

        const userAlreadtExist = await usersRepository.findOne({
            email,
        });

        if(userAlreadtExist){
            return response.status(200).json({ message: "User already exists" });
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