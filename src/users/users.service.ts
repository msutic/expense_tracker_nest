import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
