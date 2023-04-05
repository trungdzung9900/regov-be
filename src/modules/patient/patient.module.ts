import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient, PatientSchema } from './patient.schema';
import * as bcrypt from 'bcrypt';
import { PatientRepository } from './patient.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [PatientSchema],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Patient.name,
        useFactory: () => {
          const schema = PatientSchema;
          schema.pre('save', async function () {
            if (this.password) {
              const salt = await bcrypt.genSalt();
              const hash = await bcrypt.hash(this.password, salt);
              this.password = hash;
              this.salt = salt;
              console.log(hash);
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository],
  exports: [PatientService],
})
export class PatientModule {}
