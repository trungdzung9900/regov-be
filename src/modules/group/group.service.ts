import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PatientService } from '../patient/patient.service';
import { AddPatientToGroupDto } from './dto/add-patient-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';

import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly patientService: PatientService,
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    const { groupName } = createGroupDto;
    const groupFound = await this.groupRepository.TSchema.findOne({
      groupName,
    });
    if (groupFound) {
      throw new HttpException(
        'User group have been existed',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.groupRepository.create({
      groupName,
    });
  }

  async addPatientToGroupDto(id: string, addPatientDto: AddPatientToGroupDto) {
    const { patients } = addPatientDto;
    const patientsFound = await this.patientService.findPatient(patients);
    if (patientsFound.length != patients.length) {
      throw new HttpException(
        'One of patients do not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const groupUpdate = await this.groupRepository.TSchema.findByIdAndUpdate(
      { _id: id },
      { patients },
    );
    if (!groupUpdate) {
      throw new HttpException('User group not found', HttpStatus.BAD_REQUEST);
    }
    return groupUpdate;
  }
}
