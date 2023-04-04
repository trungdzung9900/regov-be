import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { LogInDto } from '../authentication/dto/login-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('create')
  create(@Body() CreatePatientDrabDto: CreatePatientDto) {
    return this.patientService.createPatient(CreatePatientDrabDto);
  }
}
