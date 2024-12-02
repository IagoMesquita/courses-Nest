import { DataSource } from 'typeorm';
import { dataSourseOptions } from './database.module';
import { CreateCoursesTable1732882136409 } from 'src/migrations/1732882136409-CreateCoursesTable';
import { CreateTagsTable1732975954157 } from 'src/migrations/1732975954157-CreateTagsTable';
import { CreateCoursesTagsTable1733135900801 } from 'src/migrations/1733135900801-CreateCoursesTagsTable';

export const dataSourse = new DataSource({
  ...dataSourseOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1732882136409,
    CreateTagsTable1732975954157,
    CreateCoursesTagsTable1733135900801,
  ],
});

// Importante: Para rodar as migragoes no NestJs, a build deve estar atualizada.
// migrations: Sinaliza quais migrations serao adicionada no banco de dados na hora de migration:run
