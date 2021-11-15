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
  async update(
    @Param('id') id: string,
    @Body() updateIncomeGroupDto: UpdateIncomeGroupDto,
  ) {
    await this.incomeGroupsService
      .update(id, updateIncomeGroupDto)
      .then((res) => {
        console.log(res);
        return 'USPESNO';
      })
      .catch((error) => {
        console.log(error);
        return 'neuspesnO!';
      });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.incomeGroupsService.delete(id);
    } catch {
      throw new NotFoundException(`Income group with id #${id} not found`);
    }
    return `Successfully deleted income group with id ${id}`;
  }
}
