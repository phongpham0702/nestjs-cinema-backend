import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MovieType } from './movie-type.entity';

@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
    unique: true,
  })
  movieName: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  directors: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  actors: string;

  @Column({
    type: 'int',
    nullable:false,
    
  })
  duration:number;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  releaseDate: Date;

  @ManyToMany(() => MovieType,{
    cascade:true
  })
  @JoinTable()
  types:MovieType[]

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
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isPublish?: boolean;

  @CreateDateColumn()
  createdAt:Date;

  @UpdateDateColumn()
  updatedAt:Date;

  @DeleteDateColumn()
  deletedAt:Date;
}
