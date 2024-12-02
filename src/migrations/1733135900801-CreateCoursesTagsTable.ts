import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCoursesTagsTable1733135900801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses_tags',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
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
    await queryRunner.dropTable('courses_tags');
  }
}


// generationStrategy: 'uuid': Nao existe uma entitade especifica para
// essa migration pois e apenas uma tabela pivo que sera criada no db que 
// tera o id de course e tag. Por isso precisamos criar o id automaticamente.
//  default: 'uuid_generate_v4()': metodo padrao do proprio PostgreSQL.

// Importante: essa tabela pivo ainda nao possui as chaves estrangeiras
// referentes as tabelas courses e tag, pois as mesmas serao inseridas 
// atraves de outras migracoes.