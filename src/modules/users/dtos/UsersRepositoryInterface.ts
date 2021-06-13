import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface UserInterface {
  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  create(data: CreateUserDTO): Promise<User>;

  save(user: User): Promise<User>;
}
