import { getRepository, Repository } from 'typeorm';
import Balance from '@modules/transactions/dtos/Balance';

import TransactionsRepositoryInterface from '@modules/transactions/dtos/TransactionsRepositoryInterface';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import User from '@modules/users/infra/typeorm/entities/User';
import CreateTransactionDTO from '../dtos/CreateTransactionDTO';

export default class TransactionsRepository
  implements TransactionsRepositoryInterface
{
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  async allTransactions(id: string): Promise<Transaction[]> {
    const transactions = await this.ormRepository.query(
      `select * from transactions where user_id = '${id}'::uuid`,
    );

    return transactions;
  }

  async balance(): Promise<Balance> {
    const transactions = await this.ormRepository.find();

    const { income, outcome } = transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        if (transaction.type === 'income')
          accumulator.income += transaction.value;

        if (transaction.type === 'outcome')
          accumulator.outcome += transaction.value;

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total: Number(total.toFixed(2)),
    };
  }

  async filterByType(type: string): Promise<Transaction[]> {
    const findType = await this.ormRepository.find({
      where: { type },
    });

    return findType;
  }

  async create(transactionData: CreateTransactionDTO): Promise<Transaction> {
    const transaction = await this.ormRepository.save(transactionData);

    await this.ormRepository.save(transaction);

    return transaction;
  }

  async save(transaction: Transaction): Promise<Transaction> {
    return this.ormRepository.save(transaction);
  }
}
