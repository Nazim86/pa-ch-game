import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {CreateQuestDto} from "../superadmin/dto/questCreate.dto";
import {HydratedDocument, Model} from "mongoose";

export type QuestDocument = HydratedDocument<Quest>;

export type QuestionModelStaticType = {
    createQuest: (
        createQuestDto: CreateQuestDto,
        questModel: QuestModelType
    ) => QuestDocument;
}

export type QuestModelType = Model<Quest> & QuestionModelStaticType

@Schema()
export class Quest {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    questContent: string;

    @Prop({ required: true, default: null })
    solution: string | null

    @Prop({ required: true, default: false})
    approved: boolean;

static createQuest(
    createQuestDto: CreateQuestDto,
) {
    const newQuest = {
        title: createQuestDto.title,
        questContent: createQuestDto.questContent,
    }
}

}

export const QuestSchema = SchemaFactory.createForClass(Quest);
const questStaticMethods = { createQuest: Quest.createQuest}

QuestSchema.statics = questStaticMethods;