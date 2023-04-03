import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseRepository } from 'src/common /libs/database/mongoose';

@Injectable()
export class CompanyRepository extends MongooseRepository<CompanyDocument> {
  constructor(@InjectModel(Company.name) model) {
    super(model);
  }
}
