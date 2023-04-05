import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class GenerateOtpDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(15)
  phone_number: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email: string;
}
