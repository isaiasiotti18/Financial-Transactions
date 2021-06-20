import AppError from '@shared/Errors/AppError';
import UsersRepositoryInterface from '../dtos/UsersRepositoryInterface';
import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
  name: string;
  email: string;
}

export default class UpdateUserService {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  public async execute({ user_id, name, email }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('User not exist.');
    }

    const updateUser = await this.usersRepository.update(checkUserExists, {
      name,
      email,
    });

    await this.usersRepository.save(updateUser);

    return updateUser;
  }
}
