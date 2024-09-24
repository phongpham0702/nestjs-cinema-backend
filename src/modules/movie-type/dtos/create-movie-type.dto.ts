import { IsNotEmpty, IsString } from "class-validator";

export class CreateMovieTypeDto{

    @IsString()
    @IsNotEmpty()
    typeName:string;
}
