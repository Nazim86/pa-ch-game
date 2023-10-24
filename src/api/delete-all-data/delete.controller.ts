import { Controller, Delete, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModelType } from '../entities/user.schema';
import { BasicAuthGuard } from '../public/auth/guards/basic-auth.guard';

@UseGuards(BasicAuthGuard)
@Controller('delete/all-data')
export class DeleteController {
  constructor(@InjectModel(User.name) private UserModel: UserModelType) {}

  @Delete()
  async deleteAllData() {
    await this.UserModel.deleteMany({});
  }
}
