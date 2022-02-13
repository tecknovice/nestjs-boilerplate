import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

const mockRepository = {};

@Module({
  providers: [
    UsersService,
    {
      provide: getRepositoryToken(User),
      useValue: mockRepository,
    },
    AuthService,
    {
      provide: JwtService,
      useValue: new JwtService({
        secret: jwtConstants.secret,
      }),
    },
  ],
  controllers: [AuthController],
})
export class MockAuthModule {}
