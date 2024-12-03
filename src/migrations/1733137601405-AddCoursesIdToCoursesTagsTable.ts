import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCoursesIdToCoursesTagsTable1733137601405
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'coursesId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'courses_tags',
      new TableForeignKey({
        name: 'courses_tags_courses',
        columnNames: ['coursesId'],
        referencedTableName: 'courses',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('courses_tags', 'courses_tags_courses');

    await queryRunner.dropColumn('courses_tags', 'coursesId');
  }
}

// Aqui temos duas acoes: 1 criacao da coluna coursesId, 2 adicao da chave estrangeira nessa coluna.
// Essa migration adiciona uma coluna na tabela courses_tags -> courses + courses_tags
// onDelete: 'SET NULL' : Case seja usado um delete, a informacao nao sera apagana e sim passada para null,
// depende da estrategia da equipe.