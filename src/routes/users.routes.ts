import { Router } from 'express';
import UserRepository from '../repositories/UsersRepository';

import CreateUserService from '../services/CreateUserService';

const userRoutes = Router();

userRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService(new UserRepository());

    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRoutes;
