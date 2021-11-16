import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeController } from './income.controller';
import { Income, IncomeSchema } from './income.model';
import { IncomeService } from './income.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Income.name, schema: IncomeSchema }]),
  ],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomesModule {}
