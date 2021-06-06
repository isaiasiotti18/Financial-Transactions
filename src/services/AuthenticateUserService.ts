import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import auth from '../config/auth';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

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