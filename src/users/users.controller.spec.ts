import { Test, TestingModule } from '@nestjs/testing';
import { MockUsersModule } from './users.module.mock';
import { UsersController } from './users.controller';

//const mockRepository = () => {};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockUsersModule],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
