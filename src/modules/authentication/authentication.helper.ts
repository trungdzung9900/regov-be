import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { Patient } from '../patient/patient.schema';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class AuthHelper {
  constructor(
    private readonly jwt: JwtService,
    private readonly patientService: PatientService,
  ) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validatePatient(decoded: any): Promise<Patient> {
    return this.patientService.getById(decoded.id);
  }

  // Generate JWT Token
  public generateToken(patient: Patient): string {
    return this.jwt.sign({
      id: patient._id,
      phone_number: patient.phone_number,
      email: patient.email,
      role: patient.role,
    });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: Patient = await this.validatePatient(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
