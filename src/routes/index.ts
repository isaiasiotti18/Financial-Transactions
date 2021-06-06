import { Router } from 'express';
import sessionsRoutes from './session.routes';
import userRoutes from './users.routes';
import transactionsRoutes from './transactions.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/transactions', transactionsRoutes);

export default routes;
