import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tags.entity';
import { randomUUID } from 'node:crypto';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinTable({name: 'courses_tags'}) // -> se eu nao passar esse name, o typeORM cria um automaticamente
  @ManyToMany(() => Tag, (tag) => tag.courses, {
    cascade: true,
  })
  tags: Tag[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Metodo para garantir que o id sera criado automaticamento
  @BeforeInsert() // -> Decorate para executar esse metodo sempre antes de criar os dado e inserir no db
  generatedId() {
    if (this.id) {
      return;
    }

    this.id = randomUUID();
  }
}

// ManyToMany:
// - primeiro parametro e o alvo ao qual entidade se relaciona
// - segundo parametro e o iverso pega o elemento que deve estar na outra tabela
// JoinTable e apenas para a tabela proprietaria, no nesse caso e Course, course possiu as tags
// cacasde = true, toda atualuzacao que Course sofre, atualiza tags tbm.
