import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateQuestDto } from './dto/questCreate.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateQuestCommand } from './use-cases/create-quest-use-case';
import { QuestsQueryRepository } from '../infrastructure/quests/quest.query.repository';
import { QuestApproveDto } from './dto/quest-qpprove.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quest } from '../entities/quest.schema';
import { Model } from 'mongoose';
import { ApprovedQuestCommand } from './use-cases/approved-quest.use-case';

@Controller('sa/quests')
export class QuestsController {
  constructor(
    private commandBus: CommandBus,
    private readonly questQueryRepo: QuestsQueryRepository,
    @InjectModel(Quest.name) private QuestModel: Model<Quest>,
  ) {}

  @Get()
  async getQuests() {
    return await this.questQueryRepo.getQuests();
  }

  @Post()
  async createQuest(@Body() createQuestDto: CreateQuestDto) {
    const questId = await this.commandBus.execute(
      new CreateQuestCommand(createQuestDto),
    );

    return await this.questQueryRepo.getQuestById(questId);
  }

  @Put()
  async approveQuest(@Body() dto: QuestApproveDto) {
    return await this.commandBus.execute(new ApprovedQuestCommand(dto));
  }
}
