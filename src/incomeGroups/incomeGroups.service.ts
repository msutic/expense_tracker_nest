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

  getAll(userId: string) {
    return this.incomeGroupModel
      .find({ $or: [{ user: userId }, { isDefault: true }] })
      .populate('user')
      .exec();
  }

  getById(id: string, userId: string) {
    return this.incomeGroupModel
      .findOne({ _id: id, $or: [{ user: userId }, { isDefault: true }] })
      .populate('user')
      .exec();
  }

  create(params) {
    const createdIncomeGroup = new this.incomeGroupModel(params);
    return createdIncomeGroup.save();
  }

  update(id: string, incomeGroupDto: UpdateIncomeGroupDto, userId: string) {
    return this.incomeGroupModel
      .findOneAndUpdate(
        { _id: id, user: userId, isDefault: false },
        incomeGroupDto,
        { new: true },
      )
      .populate('user')
      .exec();
  }

  delete(id: string) {
    return this.incomeGroupModel.findByIdAndDelete(id).populate('user');
  }

  getCount(userId: string) {
    return this.incomeGroupModel
      .count({ $or: [{ user: userId }, { isDefault: true }] })
      .exec();
  }
}
