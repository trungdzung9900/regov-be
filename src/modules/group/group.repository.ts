import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseRepository } from 'src/common /libs/database/mongoose';
import { Group, GroupDocument } from './group.schema';

@Injectable()
export class GroupRepository extends MongooseRepository<GroupDocument> {
  constructor(@InjectModel(Group.name) model) {
    super(model);
  }
}
