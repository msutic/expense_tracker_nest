import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncomeGroup, IncomegroupDocument } from './incomeGroup.model';

@Injectable()
export class IncomeGroupsService {
  constructor(
    @InjectModel(IncomeGroup.name)
    private incomeGroupModel: Model<IncomegroupDocument>,
  ) {}
  incomeGroups: IncomeGroup[];

  async getAll(): Promise<IncomeGroup[]> {
    return this.incomeGroupModel.find().exec();
  }
}
