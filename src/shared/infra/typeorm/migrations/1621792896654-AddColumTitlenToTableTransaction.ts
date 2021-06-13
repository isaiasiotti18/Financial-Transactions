import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumTitlenToTableTransaction1621792896654
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'title',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'title');
  }
}
