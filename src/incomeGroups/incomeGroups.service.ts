import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
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

  getById(id: string) {
    return this.incomeGroupModel.findById(id).populate('user').exec();
  }

  create(params) {
    const createdIncomeGroup = new this.incomeGroupModel(params);
    return createdIncomeGroup.save();
  }

  update(id: string, incomeGroupDto: UpdateIncomeGroupDto) {
    return this.incomeGroupModel
      .findByIdAndUpdate(id, incomeGroupDto, { new: true })
      .populate('user')
      .exec();
  }

  delete(id: string) {
    return this.incomeGroupModel.findByIdAndDelete(id).populate('user');
  }

  getCount() {
    return this.incomeGroupModel.count().exec();
  }
}
