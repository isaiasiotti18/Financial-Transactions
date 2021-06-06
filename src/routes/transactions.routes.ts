import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticate';
import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRoutes = Router();

transactionsRoutes.post('/', ensureAuthenticated, async (request, response) => {
  try {
    const { title, type, value } = request.body;
    const { id: user_id } = request.user;

    const createTransaction = new CreateTransactionService(
      new TransactionsRepository(),
    );

    const transaction = await createTransaction.execute({
      user_id,
      title,
      type,
      value,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionsRoutes;
