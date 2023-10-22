import { CommandHandler } from '@nestjs/cqrs';
import { QuestRepository } from '../../infrastructure/quests/quest.repository';
import { QuestApproveDto } from '../dto/quest-qpprove.dto';
import { NotFoundException } from '@nestjs/common';
import { QuestsQueryRepository } from '../../infrastructure/quests/quest.query.repository';

export class ApprovedQuestCommand {
  constructor(public dto: QuestApproveDto) {}
}

@CommandHandler(ApprovedQuestCommand)
export class ApproveQuestUseCase {
  constructor(
    private readonly questQueryRepo: QuestsQueryRepository,
    private readonly questRepository: QuestRepository,
  ) {}

  async execute(command: ApprovedQuestCommand) {
    const quest = await this.questQueryRepo.findQuestById(command.dto.questId);
    console.log(quest);
    if (!quest) {
      throw new NotFoundException();
    }

    return await this.questRepository.updateQuest(command.dto);
  }
}
