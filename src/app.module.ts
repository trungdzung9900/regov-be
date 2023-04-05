import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { PatientModule } from './modules/patient/patient.module';
import { DatabaseModule } from './config/database.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_PATH: Joi.string().required(),
      }),
    }),
    AdminModule,
    PatientModule,
    DatabaseModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
