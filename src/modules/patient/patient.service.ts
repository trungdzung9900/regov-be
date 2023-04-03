import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  create(createPatientDto: CreatePatientDto) {
    return 'This action adds a new patient';
  }
}
