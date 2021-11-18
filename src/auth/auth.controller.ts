import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/user.dto';
import { AuthService } from './auth.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
