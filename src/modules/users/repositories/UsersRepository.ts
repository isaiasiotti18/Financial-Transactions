import { getRepository, Repository } from 'typeorm';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

import UsersRepositoryInterface from '@modules/users/dtos/UsersRepositoryInterface';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/Errors/AppError';
import UpdateUserDTO from '../dtos/UpdateUserDTO';

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

    return user;
  }

  async update(user: User, userData: UpdateUserDTO): Promise<User> {
    const userUpdate = await this.ormRepository.merge(user, userData);

    return userUpdate;
  }

  save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
