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

//IMPORTANTE: aqui nos criamos o nome da tabela como name: 'courses_tags', porem como estamos 
// criando o relacionamento com TypeORM nas Entity, usando decorates,
// ele ja cria um nome automaticamente para tabela pivo que nesse caso foi 'courses_tags_tag'.

// Nome da tabela pivô gerado automaticamente está errado

// O TypeORM gera automaticamente o nome da tabela pivô com base no nome das entidades relacionadas e suas colunas.
// Se você não definiu explicitamente o nome da tabela pivô na relação muitos-para-muitos, o TypeORM pode ter assumido um nome diferente, como courses_tags em vez de courses_tags_tags.
// Solução:
// Defina explicitamente o nome da tabela pivô usando a propriedade @JoinTable:

// @ManyToMany(() => Tag, (tag) => tag.courses)
// @JoinTable({ name: 'courses_tags' }) // Nome explícito para a tabela pivô
// tags: Tag[];