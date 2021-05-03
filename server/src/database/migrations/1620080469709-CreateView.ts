import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateView1620080469709 implements MigrationInterface {
  table = new Table({
    name: 'views',
    columns: [
      { type: 'int', name: 'id', isPrimary: true, isGenerated: true },
      { type: 'uuid', name: 'class_id' },
      { type: 'uuid', name: 'user_id' },
      { type: 'timestamp', name: 'created_at', default: 'now()' }
    ],
    foreignKeys: [
      {
        name: 'FK_Views_User',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      {
        name: 'FK_Views_Class',
        columnNames: ['class_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'classes',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }
    ]
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
