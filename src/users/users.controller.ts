import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): any {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const user = await this.usersService.getById(id);
      return { user };
    } catch {
      return `User with id #${id} does not exist`;
    }
  }
}
