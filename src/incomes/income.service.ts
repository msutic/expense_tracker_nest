import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIncomeDto } from './income.dto';
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
}
