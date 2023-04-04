import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientRepository } from './patient.repository';
import PatientStatus from 'src/common /enum/patient.status.enum';
import Role from 'src/common /enum/role.enum';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async createPatient(createPatientDto: CreatePatientDto) {
    const { phone_number, email } = createPatientDto;
    if (phone_number) {
      const patientFound = await this.patientRepository.TSchema.findOne({
        phone_number: phone_number,
      });
      if (patientFound) {
        throw new HttpException(
          'Phone number have been existed',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (email) {
      const patientFound = await this.patientRepository.TSchema.findOne({
        email: email,
      });
      if (patientFound) {
        throw new HttpException(
          'Email have been existed',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const patient = await this.patientRepository.create({
      ...createPatientDto,
      status: PatientStatus.UNVERIFIED,
      role: Role.PATIENT,
    });
    console.log('patient', patient);
    return patient;
  }

  async getById(id: string) {
    const patient = await this.patientRepository.TSchema.findById(id);
    if (!patient) {
      throw new HttpException(
        'This patient does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return patient;
  }

  public async findPatient(condition) {
    const patient = await this.patientRepository.TSchema.findOne(condition);
    if (!patient) {
      throw new HttpException(
        'This patient does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return patient;
  }
}
