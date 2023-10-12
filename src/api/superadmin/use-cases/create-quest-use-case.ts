import { CommandHandler } from '@nestjs/cqrs';
import { CreateQuestDto } from '../dto/questCreate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quest, QuestModelType } from '../../entities/quest.schema';

export class CreateQuestCommand {
  constructor(public createQuestDto: CreateQuestDto) {}
}

@CommandHandler(CreateQuestCommand)
export class CreateQuestUseCase {
  constructor(@InjectModel(Quest.name) private questModel: QuestModelType) {}

  async execute(command: CreateQuestCommand) {}
}
