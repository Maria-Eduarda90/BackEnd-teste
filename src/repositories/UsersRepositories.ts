import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entitys/user';

@EntityRepository(User)
class UsersRepositories extends Repository<User>{}

export { UsersRepositories }