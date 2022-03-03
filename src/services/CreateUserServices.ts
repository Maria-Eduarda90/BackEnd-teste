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

class CreateUserService {
    async execute({name, email, password}: IUserProps){
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email){
            throw new ErrorsUser("email incorrect!");
        }

        const userAlreadtExist = await usersRepository.findOne({
            email,
        });

        if(userAlreadtExist){
            throw new ErrorsUser("Email already exists!");
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

}

export { CreateUserService }