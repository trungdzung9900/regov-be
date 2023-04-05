import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import groupSchema from './group.schema';
import { GroupRepository } from './group.repository';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [groupSchema, PatientModule],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
  exports: [GroupService],
})
export class GroupModule {}
