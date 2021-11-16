import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeGroup, IncomeGroupSchema } from './incomeGroup.model';
import { IncomeGroupsController } from './incomeGroups.controller';
import { IncomeGroupsService } from './incomeGroups.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IncomeGroup.name, schema: IncomeGroupSchema },
    ]),
  ],
  controllers: [IncomeGroupsController],
  providers: [IncomeGroupsService],
})
export class IncomeGroupsModule {}
