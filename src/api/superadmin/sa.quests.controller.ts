import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestDto } from './dto/questCreate.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateQuestCommand } from './use-cases/create-quest-use-case';
import { QuestsQueryRepository } from '../infrastructure/quests/quest.query.repository';

@Controller('sa/quests')
export class QuestsController {
  constructor(
    private commandBus: CommandBus,
    private readonly questQueryRepo: QuestsQueryRepository,
  ) {}

  @Post()
  async createQuest(@Body() createQuestDto: CreateQuestDto) {
    const questId = await this.commandBus.execute(
      new CreateQuestCommand(createQuestDto),
    );

    return await this.questQueryRepo.getQuestById(questId);
  }
}
