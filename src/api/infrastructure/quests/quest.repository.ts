import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Quest, QuestDocument } from '../../entities/quest.schema';
import { QuestApproveDto } from '../../superadmin/dto/quest-qpprove.dto';

@Injectable()
export class QuestRepository {
  constructor(@InjectModel(Quest.name) private QuestModel: Model<Quest>) {}

  async saveQuest(quest: QuestDocument) {
    return quest.save();
  }

  async updateApproveQuest(dto: QuestApproveDto) {
    const isUpdated = await this.QuestModel.updateOne(
      { _id: new Types.ObjectId(dto.questId) },
      { approved: dto.approved },
    );

    return isUpdated.acknowledged;
  }
}
