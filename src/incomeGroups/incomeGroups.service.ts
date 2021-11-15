import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      await this.incomeGroupModel.findByIdAndUpdate(id, incomeGroupDto);
    } catch {
      throw new NotFoundException(`Could not find income group with id ${id}`);
    }
  }

  delete(id: string) {
    return this.incomeGroupModel.findByIdAndDelete(id);
  }
}
