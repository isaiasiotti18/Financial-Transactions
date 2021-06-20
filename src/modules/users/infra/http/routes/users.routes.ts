import { Router } from 'express';
import UserRepository from '@modules/users/repositories/UsersRepository';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticate';

const userRoutes = Router();

userRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService(new UserRepository());

    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

userRoutes.patch('/update', ensureAuthenticated, async (request, response) => {
  try {
    const { name, email } = request.body;
    const { id } = request.user;

    const updateUser = new UpdateUserService(new UserRepository());

    const user = await updateUser.execute({
      user_id: id,
      name,
      email,
    });

    return response.json({
      message: 'change made successfully.',
      user: {
        id,
        name,
        email,
      },
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRoutes;
