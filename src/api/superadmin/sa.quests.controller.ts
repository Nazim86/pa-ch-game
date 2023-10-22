import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quest } from '../entities/quest.schema';
import { CreateQuestDto } from './dto/questCreate.dto';
import { Model } from 'mongoose';

@Controller('sa/quest')
export class QuestsController {
  constructor(@InjectModel(Quest.name) private questModel: Model<Quest>) {}

  @Post()
  async createQuest(@Body() createQuestDto: CreateQuestDto) {
    const newQuest = Quest.createQuest(createQuestDto);
    const result = await newQuest.save();
    return result;
  }
}
