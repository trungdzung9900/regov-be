import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Exclude, Transform } from 'class-transformer';
import { ObjectId, SchemaTypes } from 'mongoose';
import { Patient } from '../patient/patient.schema';

export type GroupDocument = Group;
@Schema({
  versionKey: false,
  collection: 'group',
})
export class Group {
  @Transform(({ value }) => value.toString())
  @Exclude()
  _id?: ObjectId;

  @Prop({ required: true })
  groupName: string;

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: Patient.name }],
  })
  patients?: [ObjectId];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
export default MongooseModule.forFeature([
  { name: Group.name, schema: GroupSchema },
]);
