import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AddChildrenDto } from './dto/add-children-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('add-children/:patientId')
  addChildren(@Param() patientId, @Body() addChildrenDto: AddChildrenDto) {
    return this.adminService.addChildren(patientId, addChildrenDto);
  }

  @Get('patients')
  findAll() {
    return this.adminService.findAllPatient();
  }
}
