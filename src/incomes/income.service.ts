import { Injectable } from '@nestjs/common';
import { Income } from './income.model';

@Injectable()
export class IncomeService {
  incomes: Income[];

  getAll(): any {
    return this.incomes;
  }
}
