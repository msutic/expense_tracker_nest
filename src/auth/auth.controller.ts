import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';
import { AuthService } from './auth.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
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

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
