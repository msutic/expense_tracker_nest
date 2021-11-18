import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.getByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByLogin(loginUserDto);
    const token = this._createToken(user);
    return {
      username: user.username,
      ...token,
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

  private _createToken({ username }: User): {
    expiresIn: number | string;
    accessToken: string;
  } {
    const user = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: this.configService.get('jwt.expires'),
      accessToken,
    };
  }
}
