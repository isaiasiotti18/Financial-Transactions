import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import auth from '../config/auth';

import User from '../models/User';
import UsersRepositoryInterface from '../interfaces/UsersRepositoryInterface';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Incorrect email/password.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password.');
    }

    const token = sign({}, auth.jwt.secrect, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user, token };
  }
}
