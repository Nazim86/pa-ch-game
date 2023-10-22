import { Controller, NotFoundException, Put } from '@nestjs/common';
import { QuestApproveDto } from './dto/quest-qpprove.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quest } from '../../entities/quest.schema';
import { Model } from 'mongoose';

@Controller()
export class QuestController {
  constructor(@InjectModel(Quest.name) private QuestModel: Model<Quest>) {}

  @Put()
  async approveQuest(dto: QuestApproveDto) {
    const quest = await this.QuestModel.findById(dto.questId);

    if (quest) {
      throw new NotFoundException();
    }

    const isUpdated = await this.QuestModel.updateOne(
      { _id: dto.questId },
      { approved: dto.approved },
    );

    return isUpdated;
  }
}
