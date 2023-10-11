import { BasicAuthGuard } from '../public/auth/guards/basic-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUsersCommand } from './use-cases/create-user-use-case';
import { CreateUserDto } from './dto/createUser.Dto';

@UseGuards(BasicAuthGuard)
@Controller('sa/users')
export class SAUsersController {
  constructor(private commandBus: CommandBus) {}

  // @Get()
  // async getUsers() {
  //   const users = await this.usersQueryRepo.getUsers(query, 'SA');
  //   return users;
  // }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const userId = await this.commandBus.execute(
      new CreateUsersCommand(createUserDto),
    );
    console.log(userId);
    return userId;
    // if (userId) {
    //   return await this.usersQueryRepo.getUserById(userId);
    // }
  }

  // @Delete(':id')
  // @HttpCode(204)
  // async deleteUser(@Param('id') userId: string) {
  //   const deleteUser = await this.usersService.deleteUser(userId);
  //
  //   if (!deleteUser) {
  //     return exceptionHandler(ResultCode.NotFound);
  //   }
  //   return;
  // }
}