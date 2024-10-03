import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieTypeTranslation } from './movie-type-translation.entity';

@Index('movie_type_pkey', ['id'], { unique: true })
@Entity({ name: 'movie_types' })
export class MovieType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'type_name',
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  typeName: string;

  @OneToMany(
    () => MovieTypeTranslation,
    (translation: MovieTypeTranslation) => translation.movieType,
    {
      nullable: true,
    },
  )
  translation: MovieTypeTranslation[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedDate: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
