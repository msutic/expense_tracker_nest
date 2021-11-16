import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
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
      const updatedIncGroup = await this.incomeGroupsService.update(
        id,
        updateIncomeGroupDto,
      );
      return `Successfully updated income group with id #${id}\n${updatedIncGroup}`;
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
