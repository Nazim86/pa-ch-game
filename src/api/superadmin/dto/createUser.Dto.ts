import { IsEmail, IsInt, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 10)
  //@IsUserAlreadyExist({ message: 'Existing Login' })
  login: string;

  @ApiProperty()
  @IsString()
  @Length(6, 20)
  password: string;

  @ApiProperty()
  @IsEmail()
  // @IsUserAlreadyExist({ message: 'Existing email' })
  email: string;

  @ApiProperty()
  @IsString()
  //TODO:add tel number format check
  phoneNumber: string;

  @ApiProperty()
  @IsInt()
  @Min(3)
  @Max(99)
  age: number;
}
