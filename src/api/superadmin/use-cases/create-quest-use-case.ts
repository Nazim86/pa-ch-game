import { CommandHandler } from '@nestjs/cqrs';
import { CreateQuestDto } from '../dto/questCreate.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Quest,
  QuestDocument,
  QuestModelTYpe,
} from '../../entities/quest.schema';
import { exceptionHandler } from '../../../common/exception-handler';
import { ResultCode } from '../../../common/result-code-enum';
import { QuestRepository } from '../../infrastructure/quests/quest.repository';

export class CreateQuestCommand {
  constructor(public createQuestDto: CreateQuestDto) {}
}

@CommandHandler(CreateQuestCommand)
export class CreateQuestUseCase {
  constructor(
    @InjectModel(Quest.name) private QuestModel: QuestModelTYpe,
    private readonly questRepository: QuestRepository,
  ) {}

  async execute(command: CreateQuestCommand) {
    const newQuest: QuestDocument = this.QuestModel.createQuest(
      command.createQuestDto,
      this.QuestModel,
    );

    try {
      await this.questRepository.saveQuest(newQuest);
    } catch (e) {
      console.log(e);
      exceptionHandler(ResultCode.BadRequest);
    }
    return newQuest.id;
  }
}
