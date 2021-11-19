import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIncomeDto, UpdateIncomeDto } from './income.dto';
import { Income, IncomeDocument } from './income.model';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(Income.name) private incomeModel: Model<IncomeDocument>,
  ) {}

  getAll(userId: string, order: number, page: number, limit: number) {
    return this.incomeModel
      .find({ user: userId })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('user')
      .populate('incomeGroup')
      .sort({ amount: order })
      .exec();
  }

  getLastFive(userId: string) {
    return this.incomeModel
      .find({ user: userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate('user')
      .populate('incomeGroup')
      .exec();
  }

  getLastFiveByGroup(id: string, userId: string) {
    return this.incomeModel
      .find({ incomeGroup: id, user: userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate('user')
      .populate('incomeGroup')
      .exec();
  }

  getById(id: string, userId: string) {
    return this.incomeModel
      .findOne({ _id: id, user: userId })
      .populate('user')
      .populate('incomeGroup')
      .exec();
  }

  create(params) {
    const income = new this.incomeModel(params);
    return income.save();
  }

  update(id: string, incomeDto: UpdateIncomeDto, userId) {
    return this.incomeModel
      .findOneAndUpdate({ _id: id, user: userId }, incomeDto, { new: true })
      .populate('user')
      .populate('incomeGroup')
      .exec();
  }

  delete(id: string, userId: string) {
    return this.incomeModel
      .findOneAndDelete({ _id: id, user: userId })
      .populate('user')
      .populate('incomeGroup')
      .exec();
  }

  getCount(userId: string) {
    return this.incomeModel.count({ user: userId });
  }
}
