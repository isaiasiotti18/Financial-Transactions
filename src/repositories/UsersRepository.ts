import { getRepository, Repository } from 'typeorm';
import CreateUserDTO from '../dtos/CreateUserDTO';

import UsersRepositoryInterface from '../interfaces/UsersRepositoryInterface';
import User from '../models/User';

export default class UsersRepository implements UsersRepositoryInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  async create(userData: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
