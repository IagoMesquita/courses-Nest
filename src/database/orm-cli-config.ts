import { DataSource } from 'typeorm';
import { dataSourseOptions } from './database.module';
import { CreateCoursesTable1732882136409 } from 'src/migrations/1732882136409-CreateCoursesTable';

export const dataSourse = new DataSource({
  ...dataSourseOptions,
  synchronize: false,
  migrations: [CreateCoursesTable1732882136409],
});


// Importante: Para rodar as migragoes no NestJs, a build deve estar atualizada.