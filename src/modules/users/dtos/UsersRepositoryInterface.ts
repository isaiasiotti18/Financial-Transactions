import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import UpdateUserDTO from '@modules/users/dtos/UpdateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface UserInterface {
  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  update(user: User, userData: UpdateUserDTO): Promise<User>;

  create(data: CreateUserDTO): Promise<User>;

  save(user: User): Promise<User>;
}
