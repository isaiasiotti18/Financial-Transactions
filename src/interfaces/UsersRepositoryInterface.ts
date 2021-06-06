import CreateUserDTO from '../dtos/CreateUserDTO';
import User from '../models/User';

export default interface UserInterface {
  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  create(data: CreateUserDTO): Promise<User>;

  save(user: User): Promise<User>;
}
