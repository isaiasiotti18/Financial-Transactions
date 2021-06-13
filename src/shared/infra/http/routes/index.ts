import { Router } from 'express';
import sessionsRoutes from '@modules/users/infra/http/routes/session.routes';
import userRoutes from '@modules/users/infra/http/routes/users.routes';
import transactionsRoutes from '@modules/transactions/infra/http/routes/transactions.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/transactions', transactionsRoutes);

export default routes;
