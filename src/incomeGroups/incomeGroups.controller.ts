import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateIncomeGroupDto } from './incomeGroup.dto';
import { UpdateIncomeGroupDto } from './incomeGroup.dto';
import { IncomeGroupsService } from './incomeGroups.service';

@Controller('income-groups')
export class IncomeGroupsController {
  constructor(private readonly incomeGroupsService: IncomeGroupsService) {}

  @Get()
  async getAll() {
    return this.incomeGroupsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const incomeGroup = await this.incomeGroupsService.getById(id);
      return incomeGroup;
    } catch {
      return `Income group with id #${id} does not exist.`;
    }
  }

  @Post()
  async create(@Body() incomeGroupDto: CreateIncomeGroupDto) {
    return this.incomeGroupsService.create(incomeGroupDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIncomeGroupDto: UpdateIncomeGroupDto,
  ) {
    try {
      const incomeGroup = await this.incomeGroupsService.update(
        id,
        updateIncomeGroupDto,
      );
      return { status: 'success', incomeGroup };
    } catch {
      return `Income group with id #${id} not found`;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const incomeGroup = await this.incomeGroupsService.delete(id);
      return { status: 'success', deletedIncomeGroup: incomeGroup };
    } catch {
      return 'e pa nista';
    }
  }
}
