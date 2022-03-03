import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

class DeleteUserServices {
    async execute(id: string){
        const deleteUser =  getCustomRepository(UsersRepositories);  
        try  {
            if(!await deleteUser.findOne(id)){
                return new Error("Usuario não existe")
            } else {
                await deleteUser.delete(id);
                return new Error("Usuario Deletado com sucesso")
            }
        } catch (Error){
            return new Error("Error")
        }
    }
}

export { DeleteUserServices }