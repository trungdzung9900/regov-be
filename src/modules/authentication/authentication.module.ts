import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthHelper } from './authentication.helper';
import { JwtStrategy } from './authentication.strategy';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [
    PatientModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          )}s`,
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthHelper, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
