import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateClass1620079698293 implements MigrationInterface {
  table = new Table({
    name: 'classes',
    columns: [
      { type: 'uuid', name: 'id', isPrimary: true },
      { type: 'varchar', name: 'slug' },
      { type: 'int', name: 'number' },
      { type: 'varchar', name: 'title' },
      { type: 'varchar', name: 'content' },
      { type: 'varchar', name: 'youtube_video_id' },
      { type: 'boolean', name: 'show', default: false },
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
