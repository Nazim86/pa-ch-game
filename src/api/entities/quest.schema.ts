import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Model } from 'mongoose';
import { CreateQuestDto } from '../superadmin/dto/questCreate.dto';

export type QuestDocument = HydratedDocument<Quest>;

export type QuestModelStaticType = {
  createQuest: (title: string, questContent: string) => QuestDocument;
};

export type QuestModelTYpe = Model<Quest> & QuestModelStaticType;

@Schema()
export class Quest extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  questContent: string;

  @Prop({ required: true, default: false })
  approved: boolean;

  static createQuest(dto: CreateQuestDto): Quest {
    const newQuest = new Quest();
    newQuest.questContent = dto.questContent;
    newQuest.title = dto.title;
    return newQuest;
  }
}

export const QuestSchema = SchemaFactory.createForClass(Quest);
const questStaticMethods = { createQuest: Quest.createQuest };

QuestSchema.statics = questStaticMethods;
