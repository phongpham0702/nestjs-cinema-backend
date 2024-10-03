import { IsEnum, IsNotEmpty } from 'class-validator';
import { LanguageCode } from '../enums/language-code.enum';

export class createTranslationDto {
  @IsEnum(LanguageCode)
  @IsNotEmpty()
  languageCode: LanguageCode;
}
