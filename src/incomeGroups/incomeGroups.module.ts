import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { IncomeGroup, IncomeGroupSchema } from './incomeGroup.model';
import { IncomeGroupsController } from './incomeGroups.controller';
import { IncomeGroupsService } from './incomeGroups.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IncomeGroup.name, schema: IncomeGroupSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [IncomeGroupsController],
  providers: [IncomeGroupsService, UsersService],
})
export class IncomeGroupsModule {}
