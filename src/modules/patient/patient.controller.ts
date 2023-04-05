import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { GenerateOtpDto } from './dto/generate-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('create')
  create(@Body() CreatePatientDrabDto: CreatePatientDto) {
    return this.patientService.createPatient(CreatePatientDrabDto);
  }
  @Post('generate-otp')
  generateOtp(@Body() generateOtp: GenerateOtpDto) {
    return this.patientService.generateOTP(generateOtp);
  }

  @Post('verify-otp')
  verifyOtp(@Body() verifyOtp: VerifyOtpDto) {
    return this.patientService.verifyOtp(verifyOtp);
  }
}
