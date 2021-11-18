import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateIncomeDto, UpdateIncomeDto } from './income.dto';
import { IncomeService } from './income.service';

@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomesService: IncomeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Query() query) {
    const { order, page, limit } = query;

    const incomes = await this.incomesService.getAll(+order, +page, +limit);
    const count = await this.incomesService.getCount();
    return { incomes, count };
  }

  @UseGuards(JwtAuthGuard)
  @Get('recent')
  getLastFive() {
    return this.incomesService.getLastFive();
  }

  @UseGuards(JwtAuthGuard)
  @Get('recent/:id')
  getLastFiveByGroup(@Param('id') id: string) {
    try {
      const lastFive = this.incomesService.getLastFiveByGroup(id);
      return lastFive;
    } catch {
      return `Income group with id #${id} does not exist`;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const income = await this.incomesService.getById(id);
      return { income };
    } catch {
      return `Income with id #${id} does not exist.`;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() incomeDto: CreateIncomeDto) {
    return this.incomesService.create(incomeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIncomeDto: UpdateIncomeDto,
  ) {
    try {
      const income = await this.incomesService.update(id, updateIncomeDto);
      return { status: 'success', income };
    } catch {
      return `Income with id #${id} not found`;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const income = await this.incomesService.delete(id);
      return { status: 'success', deletedIncome: income };
    } catch {
      return `Income with id #${id} does not exist.`;
    }
  }
}
