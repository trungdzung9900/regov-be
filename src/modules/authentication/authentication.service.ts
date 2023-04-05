import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PatientService } from '../patient/patient.service';
import { AuthHelper } from './authentication.helper';
import { LogInDto } from './dto/login-patient.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly patientService: PatientService,
    private readonly helper: AuthHelper,
  ) {}

  async login(loginDto: LogInDto) {
    const { phone_number, email, password } = loginDto;
    let isPasswordValid: boolean;
    let patient;
    if (phone_number) {
      const patientFound = await this.patientService.findOnePatient({
        phone_number: phone_number,
      });
      if (!patientFound) {
        throw new HttpException('Phone_number not found', HttpStatus.NOT_FOUND);
      }
      isPasswordValid = this.helper.isPasswordValid(
        password,
        patientFound.password,
      );
      patient = { ...patientFound };
    }
    if (email) {
      const patientFound = await this.patientService.findOnePatient({
        email: email,
      });
      if (!patientFound) {
        throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
      }
      isPasswordValid = this.helper.isPasswordValid(
        password,
        patientFound.password,
      );
      patient = { ...patientFound };
    }
    if (!isPasswordValid) {
      throw new HttpException('Wrong Password', HttpStatus.NOT_FOUND);
    }
    // return this.helper.generateToken(patient);
    return 'Login Success';
  }
}
