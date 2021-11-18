import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.getByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.usersService.create(createUserDto);
    } catch (err) {
      console.log(err);
      status = {
        success: false,
        message: err.message,
      };
    }
    return status;
  }
}
