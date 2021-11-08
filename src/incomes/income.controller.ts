import { Controller, Get } from '@nestjs/common';
import { IncomeService } from './income.service';

@Controller()
export class IncomeController {
  constructor(private readonly incomesService: IncomeService) {}

  getAll(): any {
    return this.incomesService.getAll();
  }
}
