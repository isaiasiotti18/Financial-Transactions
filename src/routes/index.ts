import { Router } from 'express';
import sessionsRoutes from './session.routes';
import userRoutes from './users.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
