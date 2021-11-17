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

  getAll(order: number, page: number, limit: number) {
    return this.incomeModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('user')
      .populate('incomeGroup')
      .sort({ amount: order })
      .exec();
  }

  getById(id: string) {
    return this.incomeModel
      .findById(id)
      .populate('user')
      .populate('incomeGroup')
      .exec();
  }

  create(incomeDto: CreateIncomeDto) {
    const income = new this.incomeModel(incomeDto);
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

  getCount() {
    return this.incomeModel.count();
  }
}
