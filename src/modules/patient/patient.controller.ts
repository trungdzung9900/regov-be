import { Controller, Post, Body } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() CreatePatientDrabDto: CreatePatientDto) {
    return this.patientService.create(CreatePatientDrabDto);
  }
}
