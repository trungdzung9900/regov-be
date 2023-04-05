import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Exclude, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
import PatientStatus from 'src/common /enum/patient.status.enum';
import Role from 'src/common /enum/role.enum';

export type PatientDocument = Patient;
@Schema({
  versionKey: false,
  collection: 'patient',
})
export class Patient {
  @Transform(({ value }) => value.toString())
  @Exclude()
  _id?: ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  status: PatientStatus;

  @Prop()
  otp_code?: string;

  @Prop()
  role?: Role;

  @Prop()
  children?: [];

  @Prop()
  salt?: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
export default MongooseModule.forFeature([
  { name: Patient.name, schema: PatientSchema },
]);
