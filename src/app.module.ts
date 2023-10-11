import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
export const configModule = ConfigModule.forRoot({ isGlobal: true });

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { CqrsModule } from '@nestjs/cqrs';
import { User, UserSchema } from './api/entities/user.schema';
import { CreateUsersUseCase } from './api/superadmin/use-cases/create-user-use-case';
import { SAUsersController } from './api/superadmin/sa.users.controller';
import { UsersRepository } from './api/infrastructure/users/users.repository';
import { UsersQueryRepository } from './api/infrastructure/users/users.query.repository';

const mongooseModels = [{ name: User.name, schema: UserSchema }];

const useCases = [CreateUsersUseCase];

@Module({
  imports: [
    configModule,
    MongooseModule.forRoot(process.env.MONGOOSE_URL),
    CqrsModule,
    MongooseModule.forFeature(mongooseModels),
  ],
  controllers: [AppController, SAUsersController],
  providers: [AppService, UsersRepository, UsersQueryRepository, ...useCases],
})
export class AppModule {}
