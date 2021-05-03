import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1620079013644 implements MigrationInterface {
  table = new Table({
    name: 'users',
    columns: [
      { type: 'uuid', name: 'id', isPrimary: true },
      { type: 'varchar', name: 'name' },
      { type: 'varchar', name: 'email', isUnique: true },
      { type: 'varchar', name: 'password' },
      { type: 'boolean', name: 'send_newsletter', default: true },
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
