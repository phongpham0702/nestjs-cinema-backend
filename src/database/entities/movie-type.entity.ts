import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('movie_type_pkey',['id'],{unique:true})
@Entity({name:'movie_types'})
export class MovieType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name:'type_name',
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  typeName: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt:Date;
}
