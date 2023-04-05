import { Injectable } from '@nestjs/common';
import { AuthGuard as Guard, IAuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
import { Patient } from '../patient/patient.schema';

@Injectable()
export class JwtAuthGuard extends Guard('jwt') implements IAuthGuard {
  public handleRequest(err: unknown, patient: Patient): any {
    return patient;
  }

  // public async canActivate(context: ExecutionContext): Promise<boolean> {
  //   await super.canActivate(context);

  //   const { patient }: Request = context.switchToHttp().getRequest();

  //   return patient ? true : false;
  // }
}
