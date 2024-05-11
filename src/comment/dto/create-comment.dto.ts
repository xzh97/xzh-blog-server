import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateCommentDto {
  @IsEmail()
  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  name: string;

  @Length(1, 100)
  @IsNotEmpty()
  content: string;
}
