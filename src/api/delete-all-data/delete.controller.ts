import { Controller, Delete, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModelType } from '../entities/user.schema';
import { BasicAuthGuard } from '../public/auth/guards/basic-auth.guard';
import { Quest, QuestModelTYpe } from "../entities/quest.schema";

@UseGuards(BasicAuthGuard)
@Controller('delete/all-data')
export class DeleteController {
  constructor(@InjectModel(User.name) private UserModel: UserModelType,
              @InjectModel(Quest.name)private QuestModel:QuestModelTYpe) {}

  @Delete()
  async deleteAllData() {
    await this.UserModel.deleteMany({});
    await this.QuestModel.deleteMany({})
  }
}
