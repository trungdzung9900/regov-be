import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseRepository } from 'src/common /libs/database/mongoose';
import { Patient, PatientDocument } from './patient.schema';

@Injectable()
export class PatientRepository extends MongooseRepository<PatientDocument> {
  constructor(@InjectModel(Patient.name) model) {
    super(model);
  }
}
