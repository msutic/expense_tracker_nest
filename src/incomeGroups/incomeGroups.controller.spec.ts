import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { IncomeGroupsController } from './incomeGroups.controller';
import { IncomeGroupsService } from './incomeGroups.service';

describe('IncomeGroupsController', () => {
  let controller: IncomeGroupsController;

  const mockIncomeGroupsService = {};
  const mockUsersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeGroupsController],
      providers: [IncomeGroupsService, UsersService],
    })
      .overrideProvider(IncomeGroupsService)
      .useValue(mockIncomeGroupsService)
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<IncomeGroupsController>(IncomeGroupsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
