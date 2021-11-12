import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { CreateIncomeGroupDto } from './incomeGroup.dto';
import { UpdateIncomeGroupDto } from './incomeGroup.dto';
import { IncomeGroupsService } from './incomeGroups.service';

@Controller('income-groups')
export class IncomeGroupsController {
  constructor(private readonly incomeGroupsService: IncomeGroupsService) {}

  @Get()
  getAll(): any {
    return this.incomeGroupsService.getAll();
  }

  @Post()
  create(@Body() incomeGroupDto: CreateIncomeGroupDto) {
    this.incomeGroupsService
      .create(incomeGroupDto)
      .then((incGroup) => console.log(`Added new income group: ${incGroup}`))
      .catch((error) => console.log(error));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateIncomeGroupDto: UpdateIncomeGroupDto,
  ) {
    this.incomeGroupsService
      .update(id, updateIncomeGroupDto)
      .then((res) => console.log(res));
    return `This action updates a #${id} income group`;
  }
}
