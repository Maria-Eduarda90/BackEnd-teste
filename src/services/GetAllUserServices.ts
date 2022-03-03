import { UsersRepositories } from '../repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';

class GetAllUserServices {
    async execute(){
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.find();

        return user;
    }
}

export { GetAllUserServices }