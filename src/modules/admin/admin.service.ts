import { Injectable } from '@nestjs/common';
import { PatientService } from '../patient/patient.service';
import { AddChildrenDto } from './dto/add-children-admin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly patientService: PatientService) {}

  async addChildren(id: string, addChildrenDto: AddChildrenDto) {
    const { children } = addChildrenDto;
    return this.patientService.addChild(id, children);
  }

  async findAllPatient() {
    return this.patientService.findPatient();
  }
}
