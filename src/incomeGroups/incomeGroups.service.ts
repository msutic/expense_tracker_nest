import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIncomeGroupDto, UpdateIncomeGroupDto } from './incomeGroup.dto';
import { IncomeGroup, IncomegroupDocument } from './incomeGroup.model';

@Injectable()
export class IncomeGroupsService {
  constructor(
    @InjectModel(IncomeGroup.name)
    private incomeGroupModel: Model<IncomegroupDocument>,
  ) {}

  async getAll(): Promise<IncomeGroup[]> {
    return this.incomeGroupModel.find().populate('user');
  }

  async create(incomeGroupDto: CreateIncomeGroupDto) {
    const createdIncomeGroup = new this.incomeGroupModel(incomeGroupDto);
    await createdIncomeGroup.save();
    return createdIncomeGroup;
  }

  async update(id: string, incomeGroupDto: UpdateIncomeGroupDto) {
    return this.incomeGroupModel.findByIdAndUpdate(id, incomeGroupDto);
  }
}
