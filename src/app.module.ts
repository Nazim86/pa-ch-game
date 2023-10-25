import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { User, UserSchema } from './api/entities/user.schema';
import { CreateUsersUseCase } from './api/superadmin/use-cases/create-user-use-case';
import { UsersRepository } from './api/infrastructure/users/users.repository';
import { QuestsController } from './api/superadmin/sa.quests.controller';
import { Quest, QuestSchema } from './api/entities/quest.schema';
import { QuestRepository } from './api/infrastructure/quests/quest.repository';
import { QuestsQueryRepository } from './api/infrastructure/quests/quest.query.repository';
import { CreateQuestUseCase } from './api/superadmin/use-cases/create-quest-use-case';
import { ApproveQuestUseCase } from './api/superadmin/use-cases/approved-quest.use-case';
import { SaUsersController } from './api/superadmin/sa.users.controller';
import { DeleteController } from './api/delete-all-data/delete.controller';
import { BasicStrategy } from './api/public/auth/strategies/basic.strategy';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import * as process from 'process';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export const configModule = ConfigModule.forRoot({ isGlobal: true });

const mongooseModels = [
  { name: User.name, schema: UserSchema },
  { name: Quest.name, schema: QuestSchema },
];

const useCases = [CreateUsersUseCase, CreateQuestUseCase, ApproveQuestUseCase];

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    configModule,
    MongooseModule.forRoot(process.env.MONGOOSE_URL),
    CqrsModule,
    MongooseModule.forFeature(mongooseModels),
  ],
  controllers: [
    AppController,
    SaUsersController,
    DeleteController,
    QuestsController,
  ],
  providers: [
    AppService,
    UsersRepository,
    BasicStrategy,
    //UsersQueryRepository,
    QuestRepository,
    QuestsQueryRepository,
    ...useCases,
  ],
})
export class AppModule {}
