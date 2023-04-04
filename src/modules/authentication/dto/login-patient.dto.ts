import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LogInDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(15)
  phone_number?: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
