import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [PatientModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
