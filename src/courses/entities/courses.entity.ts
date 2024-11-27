import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tags.entity";
import { RelationCountAttribute } from "typeorm/query-builder/relation-count/RelationCountAttribute";

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  description: string;
  
  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.courses)
  tags: Tag[];
}

// ManyToMany: 
// - primeiro parametro e o alvo ao qual entidade se relaciona
// - segundo parametro e o iverso pega o elemento que deve estar na outra tabela
// JoinTable e apenas para a tabela proprietaria, no nesse caso e Course, course possiu as tags
