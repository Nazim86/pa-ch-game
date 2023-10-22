import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { CreateUserDto } from '../superadmin/dto/createUser.Dto';

export type UserDocument = HydratedDocument<User>;

export type UserModelStaticType = {
  createUser: (
    createUserDto: CreateUserDto,
    passwordHash: string,
    UserModel: UserModelType,
    isConfirmed?: boolean,
  ) => UserDocument;
};

export type UserModelType = Model<User> & UserModelStaticType;

@Schema()
export class User {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  isConfirmed: boolean;

  static createUser(
    createUserDto: CreateUserDto,
    passwordHash: string,
    UserModel: UserModelType,
    isConfirmed?: boolean,
  ) {
    const newUser = {
      login: createUserDto.login,
      passwordHash: passwordHash,
      email: createUserDto.email,
      phoneNumber: createUserDto.phoneNumber,
      age: createUserDto.age,
      isConfirmed: isConfirmed ?? true,
    };
    return new UserModel(newUser);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
const userStaticMethods = { createUser: User.createUser };

UserSchema.statics = userStaticMethods;
