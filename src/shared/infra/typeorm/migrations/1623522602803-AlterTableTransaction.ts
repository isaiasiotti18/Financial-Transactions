import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export default class AlterTableTransaction1623522602803
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'value');

    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'value',
        type: 'double precision',
        precision: 10,
        scale: 2,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'value',
        type: 'decimal',
      }),
    );

    await queryRunner.dropColumn('transactions', 'value');
  }
}
