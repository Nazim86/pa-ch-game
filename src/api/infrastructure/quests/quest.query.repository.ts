import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Quest } from '../../entities/quest.schema';

@Injectable()
export class QuestsQueryRepository {
  constructor(@InjectModel(Quest.name) private QuestModel: Model<Quest>) {}

  async getQuestById(questId: string) {
    const quest = await this.QuestModel.findById(questId);
    return quest;
  }

  async findById(questId: string) {
    const quest = await this.QuestModel.findById({
      _id: new Types.ObjectId(questId),
    });

    return quest;
  }
}
