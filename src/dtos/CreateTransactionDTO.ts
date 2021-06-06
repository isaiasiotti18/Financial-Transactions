export default interface CreateTransactionDTO {
  user_id: string;

  title: string;

  type: 'income' | 'outcome';

  value: number;
}
