import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { QuestsController } from './api/superadmin/sa.quests.controller';
import { Quest, QuestSchema } from './api/entities/quest.schema';
import { QuestRepository } from './api/infrastructure/quests/quest.repository';
import { QuestsQueryRepository } from './api/infrastructure/quests/quest.query.repository';

export const configModule = ConfigModule.forRoot({ isGlobal: true });

const mongooseModels = [
  { name: User.name, schema: UserSchema },
  { name: Quest.name, schema: QuestSchema },
];

const useCases = [CreateUsersUseCase];

@Module({
  imports: [
    configModule,
    MongooseModule.forRoot(process.env.MONGOOSE_URL),
    CqrsModule,
    MongooseModule.forFeature(mongooseModels),
  ],
  controllers: [AppController, SAUsersController, QuestsController],
  providers: [
    AppService,
    UsersRepository,
    UsersQueryRepository,
    QuestRepository,
    QuestsQueryRepository,
    ...useCases,
  ],
})
export class AppModule {}
