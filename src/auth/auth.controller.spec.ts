import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { MockAuthModule } from './auth.module.mock';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockAuthModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
