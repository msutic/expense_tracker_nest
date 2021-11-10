import { Controller, Get } from '@nestjs/common';
import { IncomeGroupsService } from './incomeGroups.service';

@Controller('income-groups')
export class IncomeGroupsController {
  constructor(private readonly incomeGroupsService: IncomeGroupsService) {}

  @Get()
  getAll(): any {
    console.log('HEEEY');

    return this.incomeGroupsService.getAll();
  }
}
