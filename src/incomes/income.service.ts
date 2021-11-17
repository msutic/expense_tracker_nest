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

  getAll() {
    return this.incomeModel
      .find()
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
}
