import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { ErrorsUser } from '../errors/ErrorsUser';
import { hash } from 'bcryptjs';

interface IUserProps {
    id?: string;
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

        const passwordH = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: passwordH,
        });

        await usersRepository.save(user);

        return user;
    }

    async put({id, name, email, password}: IUserProps){
        const usersRepository = getCustomRepository(UsersRepositories);
        const user = await usersRepository.findOne(id);

        if(!user){
            return new Error("user does not exists")
        }

        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.password = password ? password : user.password;

        await usersRepository.save(user);

        return user;
    }
}

export { UserService }