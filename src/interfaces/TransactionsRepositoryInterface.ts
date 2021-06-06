import CreateTransactionDTO from '../dtos/CreateTransactionDTO';
import Transaction from '../models/Transaction';
import Balance from './Balance';

export default interface TransactionsRepositoryInterface {
  filterByType(type: string): Promise<Transaction[] | undefined>;

  filterByCategory?(category: string): Promise<Transaction[] | undefined>;

  allTransactions(): Promise<Transaction[]>;

  balance(): Promise<Balance>;

  create(data: CreateTransactionDTO): Promise<Transaction>;

  save(transaction: Transaction): Promise<Transaction>;
}
