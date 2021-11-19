import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getAll() {
    return this.userModel.find().exec();
  }

  getByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  getById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findByLogin({ username, password }: LoginUserDto) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const comparePassword = await user.comparePassword(password);
    if (!comparePassword)
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        },
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  }

  async create({
    username,
    password,
    email,
    firstName,
    lastName,
  }: CreateUserDto) {
    const userExists = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const createdUser = new this.userModel({
      username,
      password,
      email,
      firstName,
      lastName,
    });
    const savedUser = (await createdUser.save()).toObject();
    return savedUser;
  }
}
