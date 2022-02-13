import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockAuthModule } from './auth/auth.module.mock';
import { MockUsersModule } from './users/users.module.mock';

@Module({
  imports: [TypeOrmModule.forRoot(), MockAuthModule, MockUsersModule],
  providers: [AppService],
  controllers: [AppController],
})
export class MockAppModule {}
