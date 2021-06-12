import { getRepository, Repository } from 'typeorm';
import CreateTransactionDTO from '../dtos/CreateTransactionDTO';
import Balance from '../interfaces/Balance';

import TransactionsRepositoryInterface from '../interfaces/TransactionsRepositoryInterface';
import Transaction from '../models/Transaction';

export default class TransactionsRepository
  implements TransactionsRepositoryInterface
{
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  async allTransactions(): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find();

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
      total,
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
