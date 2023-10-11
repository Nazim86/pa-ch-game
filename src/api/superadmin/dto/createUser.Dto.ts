import { IsEmail, IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 10)
  //@IsUserAlreadyExist({ message: 'Existing Login' })
  login: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsEmail()
  // @IsUserAlreadyExist({ message: 'Existing email' })
  email: string;

  @IsString()
  //TODO:add tel number format check
  phoneNumber: string;

  @IsInt()
  @Min(3)
  @Max(99)
  age: number;
}
