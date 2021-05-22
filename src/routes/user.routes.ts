import { Router } from 'express';

const userRoutes = Router();

userRoutes.get('/', (request, response) => response.json({ ok: 'hello' }));

export default userRoutes;
