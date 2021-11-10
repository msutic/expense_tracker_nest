import { Body, Controller, Get, Post } from '@nestjs/common';
import { IncomeGroupDto } from './incomeGroup.dto';
import { IncomeGroupsService } from './incomeGroups.service';

@Controller('income-groups')
export class IncomeGroupsController {
  constructor(private readonly incomeGroupsService: IncomeGroupsService) {}

  @Get()
  getAll(): any {
    return this.incomeGroupsService.getAll();
  }

  @Post()
  create(@Body() incomeGroupDto: IncomeGroupDto): string {
    this.incomeGroupsService.create(incomeGroupDto);
    return 'This action adds a new incomeGroup';
  }
}
