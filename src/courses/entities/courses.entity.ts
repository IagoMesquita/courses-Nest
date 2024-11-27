import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  description: string;
  
  @Column('json', { nullable: true})
  tags: string[];
}

// @Column('json', { nullable: true}) -> tags sera um json no banco de dados, e pode ser nulo 