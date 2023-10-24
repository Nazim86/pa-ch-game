import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUsersCommand } from './use-cases/create-user-use-case';
import { CreateUserDto } from './dto/createUser.Dto';
import { UsersRepository } from '../infrastructure/users/users.repository';
import { exceptionHandler } from '../../common/exception-handler';
import { ResultCode } from '../../common/result-code-enum';
import { BasicAuthGuard } from "../public/auth/guards/basic-auth.guard";


@UseGuards(BasicAuthGuard)
@Controller('sa/users')
export class SaUsersController {
  constructor(
    private commandBus: CommandBus,
    private readonly usersRepo: UsersRepository, //private readonly usersQueryRepo: UsersQueryRepository,
  ) {}

  @Get()
  async getUsers() {
    //const users = await this.usersQueryRepo.getUsers();
    return await this.usersRepo.getUsers();
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const userId = await this.commandBus.execute(
      new CreateUsersCommand(createUserDto),
    );
    //console.log(userId);

    return await this.usersRepo.getUserById(userId);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') userId: string) {
    const isDeleted = await this.usersRepo.deleteUser(userId);

    if (!isDeleted) {
      return exceptionHandler(ResultCode.NotFound);
    }
    return;
  }
}
