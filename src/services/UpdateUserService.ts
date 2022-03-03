import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserProps {
    id: string;
    name: string;
    email: string;
    password: string;
}

class UpdateUserService{
    async execute({ id, name, email, password}: IUserProps){
        const updateUser = getCustomRepository(UsersRepositories);

        const user = await updateUser.findOne(id);

        if(!user){
            return new Error("User does not exists")
        }

        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.password = password ? password : user.password;

        await updateUser.save(user);

        return user;
    }
}

export { UpdateUserService }