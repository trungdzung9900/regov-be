import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  phone_number: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
