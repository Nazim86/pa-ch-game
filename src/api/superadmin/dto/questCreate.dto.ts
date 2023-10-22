import { IsString } from 'class-validator';
import { UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from '../../public/auth/guards/basic-auth.guard';
import { ApiProperty } from '@nestjs/swagger';

@UseGuards(BasicAuthGuard)
export class CreateQuestDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  questContent: string;
}
