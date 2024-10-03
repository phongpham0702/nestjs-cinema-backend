import { LanguageCode } from 'src/shared/enums/language-code.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieType } from './movie-type.entity';

@Entity({ name: 'movie_type_translation' })
@Index('idx_language_code_movie_type_id', ['languageCode', 'movieType'])
export class MovieTypeTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'type_name_translation',
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  typeNameTranslation: string;

  @Column({
    name: 'language_code',
    type: 'enum',
    enum: LanguageCode,
    nullable: false,
  })
  languageCode: LanguageCode;

  @ManyToOne(() => MovieType, (movieType: MovieType) => movieType.translation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'movie_type_id',
  })
  movieType: MovieType;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedDate: Date;
}
