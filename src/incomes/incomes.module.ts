import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  IncomeGroup,
  IncomeGroupSchema,
} from 'src/incomeGroups/incomeGroup.model';
import { IncomeGroupsService } from 'src/incomeGroups/incomeGroups.service';
import { User, UserSchema } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { IncomeController } from './income.controller';
import { Income, IncomeSchema } from './income.model';
import { IncomeService } from './income.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Income.name, schema: IncomeSchema }]),
    MongooseModule.forFeature([
      { name: IncomeGroup.name, schema: IncomeGroupSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [IncomeController],
  providers: [IncomeService, UsersService, IncomeGroupsService],
})
export class IncomesModule {}
