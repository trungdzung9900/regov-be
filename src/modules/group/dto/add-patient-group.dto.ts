import { IsArray, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AddPatientToGroupDto {
  @IsArray()
  @IsNotEmpty()
  patients: [ObjectId];
}
