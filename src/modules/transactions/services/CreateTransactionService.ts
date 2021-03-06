import TransactionsRepositoryInterface from '@modules/transactions/dtos/TransactionsRepositoryInterface';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';

interface Request {
  user_id: string;

  title: string;

  type: 'income' | 'outcome';

  value: number;
}

export default class CreateTransactionService {
  constructor(
    private transactionsRepository: TransactionsRepositoryInterface,
  ) {}

  async execute({
    user_id,
    title,
    type,
    value,
  }: Request): Promise<Transaction> {
    const transaction = await this.transactionsRepository.create({
      user_id,
      title,
      type,
      value,
    });

    await this.transactionsRepository.save(transaction);

    return transaction;
  }
}
