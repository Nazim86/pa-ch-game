import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateQuestDto } from '../superadmin/dto/questCreate.dto';
import { HydratedDocument, Model } from 'mongoose';

export type QuestDocument = HydratedDocument<Quest>;

/*export type QuestionModelStaticType = {
    createQuest: (
        createQuestDto: CreateQuestDto,
       // questModel: QuestModelType
    ) => QuestDocument;
}*/

export type QuestModelType = Model<Quest>;

//& QuestionModelStaticType

@Schema()
export class Quest {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  questContent: string;

  @Prop({ required: true })
  solution: string | null;

  @Prop({ required: true })
  approved: boolean;

  createQuest(createQuestDto: CreateQuestDto) {
    const newQuest = {
      title: createQuestDto.title,
      questContent: createQuestDto.questContent,
      solution: null,
      approved: false,
    };

    return newQuest;
  }
}

export const QuestSchema = SchemaFactory.createForClass(Quest);
//const questStaticMethods = { createQuest: Quest.createQuest };

//QuestSchema.statics = questStaticMethods;
