import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateIncomeGroupDto, UpdateIncomeGroupDto } from './incomeGroup.dto';
import { IncomeGroupsService } from './incomeGroups.service';

@Controller('income-groups')
export class IncomeGroupsController {
  constructor(
    private readonly incomeGroupsService: IncomeGroupsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req) {
    const { username } = req.user;
    const user = await this.usersService.getByUsername(username);

    const incomeGroups = await this.incomeGroupsService.getAll(user._id);
    const count = await this.incomeGroupsService.getCount(user._id);

    return { incomeGroups, count };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    const user = await this.usersService.getByUsername(username);
    try {
      const incomeGroup = await this.incomeGroupsService.getById(id, user._id);
      if (!incomeGroup) return `Not authorized!`;
      return incomeGroup;
    } catch {
      return `Income group with id #${id} does not exist.`;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() incomeGroupDto: CreateIncomeGroupDto, @Request() req) {
    const { username } = req.user;
    const user = await this.usersService.getByUsername(username);
    return this.incomeGroupsService.create({
      ...incomeGroupDto,
      user: user._id,
    });
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
