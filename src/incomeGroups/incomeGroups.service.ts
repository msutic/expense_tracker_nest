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

  getAll() {
    return this.incomeGroupModel.find().populate('user').exec();
  }

  create(incomeGroupDto: CreateIncomeGroupDto) {
    const createdIncomeGroup = new this.incomeGroupModel(incomeGroupDto);
    return createdIncomeGroup.save();
  }

  update(id: string, incomeGroupDto: UpdateIncomeGroupDto) {
    return this.incomeGroupModel
      .findByIdAndUpdate(id, incomeGroupDto)
      .populate('user')
      .exec();
  }

  delete(id: string) {
    return this.incomeGroupModel.findByIdAndDelete(id).populate('user');
  }
}
