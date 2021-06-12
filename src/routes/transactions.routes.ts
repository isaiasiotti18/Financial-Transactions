import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticate';
import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRoutes = Router();

transactionsRoutes.use(ensureAuthenticated);

transactionsRoutes.post('/', async (request, response) => {
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
  } catch {
    return response.status(400).json();
  }
});

transactionsRoutes.get('/', async (request, response) => {
  const transactions = new TransactionsRepository();

  const listTransactions = await transactions.allTransactions();
  const balance = await transactions.balance();

  return response.json({
    listTransactions,
    balance,
  });
});

transactionsRoutes.get('/type/:type', async (request, response) => {
  const { type } = request.params;

  const transactions = new TransactionsRepository();

  const transactionsByType = await transactions.filterByType(type);

  return response.json(transactionsByType);
});

export default transactionsRoutes;
