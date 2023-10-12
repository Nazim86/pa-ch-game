import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quest } from '../entities/quest.schema';
import { CreateQuestDto } from './dto/questCreate.dto';

@Controller('api/quest')
export class QuestsController {
  constructor(@InjectModel(Quest.name) private questModel: Quest) {}

  @Post('create-quest')
  async createQuest(@Body() createQuestDto: CreateQuestDto) {
    try {
      return this.questModel.createQuest(createQuestDto);
    } catch (error) {
      console.log('создание квеста не удалось');
    }
  }
}
