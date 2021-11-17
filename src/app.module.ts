import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeGroupsModule } from './incomeGroups/incomeGroups.module';
import { UsersModule } from './users/users.module';
import { IncomesModule } from './incomes/incomes.module';
import { ValidatorMiddleware } from './common/middleware/validator.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/expense-tracker'),
    IncomeGroupsModule,
    IncomesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidatorMiddleware)
      .forRoutes({ path: 'incomes', method: RequestMethod.GET });
  }
}
