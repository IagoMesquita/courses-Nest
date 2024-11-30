import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCoursesTable1732882136409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'courses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('courses');
  }
}

// Agora a tabela sera criada pela migration e nao mais pelo sincronyze baseado na etidade decoradas.
// await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'):
// - criando uma consulta para slq puro
// - extensao do postgres para poder habilitar a geracao automatica uuid para o campo id
// - Executando esse primeira vez, nao precisa executar nas demais migracoes
