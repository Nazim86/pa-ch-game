// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from '../../entities/user.schema';
// import { Model } from 'mongoose';
//
// @Injectable()
// export class UsersQueryRepository {
//   constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
//
//   async getUserById(userId: string) {
//     const user = await this.UserModel.findById(userId);
//     return user;
//   }
//
//   async getUsers() {
//     return this.UserModel.find({});
//   }
// }
