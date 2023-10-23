import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  // async saveUser(user: UserDocument) {
  //   return user.save();
  // }

  private async usersMapping(users) {
    return users.map((user) => {
      return {
        id: user._id,
        login: user.login,
        age: user.age,
        email: user.email,
        phoneNumber: user.phoneNumber,
      };
    });
  }

  async getUsers() {
    const users = await this.UserModel.find({});

    return await this.usersMapping(users);
  }

  async getUserById(userId: string) {
    const user = await this.UserModel.findById({ _id: new ObjectId(userId) });
    return {
      id: user._id,
      login: user.login,
      age: user.age,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }

  async deleteUser(userId: string) {
    const isDeleted = await this.UserModel.deleteOne({
      _id: new ObjectId(userId),
    });
    return isDeleted.deletedCount === 1;
  }
}
