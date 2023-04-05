import { Controller, Post, Body, Param } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddPatientToGroupDto } from './dto/add-patient-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }
  @Post('add-patient/:groupId')
  addPatient(
    @Param('groupId') groupId,
    @Body() addPatientToGroupDto: AddPatientToGroupDto,
  ) {
    return this.groupService.addPatientToGroupDto(
      groupId,
      addPatientToGroupDto,
    );
  }
}
