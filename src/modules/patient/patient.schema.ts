import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Patient } from './entities/patient.entity';

export type PatientDocument = Patient & Document;
@Schema({
  versionKey: false,
  collection: 'patient',
})
export class Company {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  company_name: string;

  @Prop()
  company_address: string;

  @Prop()
  company_email: string;

  @Prop()
  company_contact_no: string;

  @Prop()
  company_contact_person: string;

  @Prop()
  subscribed_date: string;

  @Prop()
  component: ComponentValue;

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: Component.name }],
  })
  @Type(() => Component)
  component_id: Component;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
export default MongooseModule.forFeature([
  { name: Company.name, schema: CompanySchema },
]);
