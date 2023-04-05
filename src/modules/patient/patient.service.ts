import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientRepository } from './patient.repository';
import PatientStatus from 'src/common /enum/patient.status.enum';
import Role from 'src/common /enum/role.enum';
import { GenerateOtpDto } from './dto/generate-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ObjectId } from 'mongoose';

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

  public async addChild(patientId: string, child: []) {
    return this.patientRepository.TSchema.findByIdAndUpdate(
      { _id: patientId },
      { children: child },
    );
  }

  async generateOTP(generateOtp: GenerateOtpDto) {
    const { email, phone_number } = generateOtp;
    const otp = Math.floor(100000 + Math.random() * 900000);
    if (email) {
      const patientFound = await this.patientRepository.TSchema.findOne({
        email: email,
      });
      if (!patientFound) {
        throw new HttpException('Patient not found', HttpStatus.BAD_REQUEST);
      }
      await this.patientRepository.TSchema.findByIdAndUpdate(
        { _id: patientFound._id },
        { otp_code: otp },
      );
      // TO DO use twillio to send email
      return otp;
    }
    if (phone_number) {
      const patientFound = await this.patientRepository.TSchema.findOne({
        phone_number: phone_number,
      });
      if (!patientFound) {
        throw new HttpException('Patient not found', HttpStatus.BAD_REQUEST);
      }
      await this.patientRepository.TSchema.findByIdAndUpdate(
        { _id: patientFound._id },
        { otp_code: otp },
      );
      // TO DO use twillio to send sms
      return otp;
    }
  }

  async verifyOtp(verifyOtp: VerifyOtpDto) {
    const { email, phone_number, otp } = verifyOtp;
    if (email) {
      const patientFound = await this.patientRepository.TSchema.findOne({
        email: email,
      });
      if (!patientFound) {
        throw new HttpException('Patient not found', HttpStatus.BAD_REQUEST);
      }
      if (otp != patientFound.otp_code) {
        throw new HttpException('Wrong OTP', HttpStatus.BAD_REQUEST);
      }
      await this.patientRepository.TSchema.findByIdAndUpdate(
        { _id: patientFound._id },
        { otp_code: null, status: PatientStatus.VERIFIED },
      );
      // TO DO use twillio to send email
      return 'Verify success';
    }
    if (phone_number) {
      const patientFound = await this.patientRepository.TSchema.findOne({
        phone_number: phone_number,
      });
      if (!patientFound) {
        throw new HttpException('Patient not found', HttpStatus.BAD_REQUEST);
      }
      if (otp != patientFound.otp_code) {
        throw new HttpException('Wrong OTP', HttpStatus.BAD_REQUEST);
      }
      await this.patientRepository.TSchema.findByIdAndUpdate(
        { _id: patientFound._id },
        { otp_code: null, status: PatientStatus.VERIFIED },
      );
      // TO DO use twillio to send sms
      return 'Verify success';
    }
  }
  public async findPatient(patients?: [ObjectId]) {
    if (patients) {
      const patientsFound = await this.patientRepository.TSchema.find({
        _id: {
          $in: patients,
        },
      });
      return patientsFound;
    }
    return this.patientRepository.TSchema.find();
  }
  public async findOnePatient(condition) {
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
