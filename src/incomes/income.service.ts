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

  getLastFive() {
    return this.incomeModel
      .find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate('user')
      .populate('incomeGroup')
      .exec();
  }

  getLastFiveByGroup(id: string) {
    return this.incomeModel
      .find({ incomeGroup: id })
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate('user')
      .populate('incomeGroup')
      .exec();
  }

  getById(id: string) {
    return this.incomeModel
      .findById(id)
      .populate('user')
      .populate('incomeGroup')
      .exec();
  }

  create(params) {
    const income = new this.incomeModel(params);
    return income.save();
  }

  update(id: string, incomeDto: UpdateIncomeDto) {
    return this.incomeModel
      .findByIdAndUpdate(id, incomeDto, { new: true })
      .populate('user')
      .populate('incomeGroup')
      .exec();
  }

  delete(id: string) {
    return this.incomeModel
      .findByIdAndDelete(id)
      .populate('user')
      .populate('incomeGroup')
      .exec();
  }

  getCount(userId: string) {
    return this.incomeModel.count({ user: userId });
  }
}
