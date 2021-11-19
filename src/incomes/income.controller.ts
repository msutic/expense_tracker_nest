import {
  Body,
  Controller,
  Request,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateIncomeDto, UpdateIncomeDto } from './income.dto';
import { IncomeService } from './income.service';

@Controller('incomes')
export class IncomeController {
  constructor(
    private readonly incomesService: IncomeService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Query() query, @Request() req) {
    const { order, page, limit } = query;

    const { username } = req.user;
    const user = await this.usersService.getByUsername(username);

    const incomes = await this.incomesService.getAll(
      user._id,
      +order,
      +page,
      +limit,
    );
    const count = await this.incomesService.getCount(user._id);
    return { incomes, count };
  }

  @UseGuards(JwtAuthGuard)
  @Get('recent')
  async getLastFive(@Request() req) {
    const { username } = req.user;
    const user = await this.usersService.getByUsername(username);
    return this.incomesService.getLastFive(user._id);
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
  async getById(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    const user = await this.usersService.getByUsername(username);
    try {
      const income = await this.incomesService.getById(id, user._id);
      if (!income) return "Cannot access someone else's income";
      return { income };
    } catch {
      return `Income with id #${id} does not exist.`;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() incomeDto: CreateIncomeDto, @Request() req) {
    const { username } = req.user;
    const user = await this.usersService.getByUsername(username);

    return this.incomesService.create({ ...incomeDto, user: user._id });
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
