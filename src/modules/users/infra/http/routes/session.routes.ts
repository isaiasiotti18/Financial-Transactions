import { Router } from 'express';
import UsersRepository from '@modules/users/repositories/UsersRepository';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService(new UsersRepository());

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user, token });
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRoutes;
