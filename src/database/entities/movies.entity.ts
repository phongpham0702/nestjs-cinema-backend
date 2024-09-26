import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieType } from './movie-type.entity';

@Index('movie_pkey', ['id'], { unique: true })
@Index('movie_name', ['movieName'], { unique: true })
@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'movie_name',
    type: 'varchar',
    length: 1024,
    nullable: false,
    unique: true,
  })
  movieName!: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  slug!: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  directors!: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  actors!: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  duration!: number;

  @Column({
    name: 'release_date',
    type: 'timestamp',
    nullable: false,
  })
  releaseDate!: Date;

  @ManyToMany(() => MovieType, {
    cascade: true,
  })
  @JoinTable()
  types: MovieType[];

  @Column({
    type: 'text',
    nullable: true,
  })
  brief?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  thumbnail?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  trailer?: string;

  @Column({
    name: 'is_publish',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isPublish?: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
