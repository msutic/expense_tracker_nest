import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateIncomeDto } from './income.dto';
import { IncomeService } from './income.service';

@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomesService: IncomeService) {}

  @Get()
  getAll() {
    return this.incomesService.getAll();
  }

  @Post()
  async create(@Body() incomeDto: CreateIncomeDto) {
    return this.incomesService.create(incomeDto);
  }
}
