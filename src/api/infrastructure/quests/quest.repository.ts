import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quest, QuestDocument } from '../../entities/quest.schema';

@Injectable()
export class QuestRepository {
  constructor(@InjectModel(Quest.name) private QuestModel: Model<Quest>) {}

  async saveQuest(quest: QuestDocument) {
    return quest.save();
  }
}
