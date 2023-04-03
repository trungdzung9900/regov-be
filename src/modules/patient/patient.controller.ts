import { Controller, Post, Body } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDrabDto } from './dto/create-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() CreatePatientDrabDto: CreatePatientDrabDto) {
    return this.patientService.create(CreatePatientDrabDto);
  }
}
