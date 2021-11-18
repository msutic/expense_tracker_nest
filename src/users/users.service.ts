import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getAll() {
    return this.userModel.find().exec();
  }

  getByUsername(username: string) {
    return this.userModel.findOne({ username: username }).exec();
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
