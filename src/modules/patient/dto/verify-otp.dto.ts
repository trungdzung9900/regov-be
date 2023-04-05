import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(15)
  phone_number: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  otp: string;
}
