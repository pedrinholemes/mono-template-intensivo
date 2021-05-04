import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAdmin1620088065199 implements MigrationInterface {
  table = new Table({
    name: 'admins',
    columns: [
      { type: 'uuid', name: 'id', isPrimary: true },
      { type: 'varchar', name: 'name' },
      { type: 'varchar', name: 'email', isUnique: true },
      { type: 'varchar', name: 'password' },
      { type: 'timestamp', name: 'created_at', default: 'now()' },
      { type: 'timestamp', name: 'updated_at', default: 'now()' }
    ]
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
