import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/courses.entity';
import {  DataSourceOptions } from 'typeorm';

export const dataSourseOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'devtraining',
  entities: [Course],
  synchronize: true, 

}

@Module({
  imports: [
  TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourseOptions
        }
      }
    })
      
  ]
})
export class DatabaseModule {}


// synchronize: true, enquanto nao temos as migracoes, ele ira subir tabela automaticamente no db de acordo com nossas entidade decoradas