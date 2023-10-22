import { CreateUserDto } from '../dto/createUser.Dto';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument, UserModelType } from '../../entities/user.schema';
import { UsersRepository } from '../../infrastructure/users/users.repository';
import { exceptionHandler } from '../../../common/exception-handler';
import { ResultCode } from '../../../common/result-code-enum';

export class CreateUsersCommand {
  constructor(public createUserDto: CreateUserDto) {}
}
@CommandHandler(CreateUsersCommand)
export class CreateUsersUseCase {
  constructor(
    @InjectModel(User.name) private UserModel: UserModelType,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(command: CreateUsersCommand) {
    const passwordHash = await bcrypt.hash(
      command.createUserDto.password,
      Number(process.env.SALT_ROUND),
    );

    const newUser: UserDocument = this.UserModel.createUser(
      command.createUserDto,
      passwordHash,
      this.UserModel,
    );

    try {
      await this.usersRepository.saveUser(newUser);
    } catch (e) {
      console.log(e);
      exceptionHandler(ResultCode.BadRequest);
    }
    return newUser.id;
  }
}
