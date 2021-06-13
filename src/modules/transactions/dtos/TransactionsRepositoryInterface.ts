import CreateTransactionDTO from '@modules/transactions/dtos/CreateTransactionDTO';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import Balance from './Balance';

export default interface TransactionsRepositoryInterface {
  filterByType(type: string): Promise<Transaction[] | undefined>;

  filterByCategory?(category: string): Promise<Transaction[] | undefined>;

  allTransactions(id: string): Promise<Transaction[]>;

  balance(): Promise<Balance>;

  create(data: CreateTransactionDTO): Promise<Transaction>;

  save(transaction: Transaction): Promise<Transaction>;
}
