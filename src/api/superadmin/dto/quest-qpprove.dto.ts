import { ApiProperty } from '@nestjs/swagger';

export class QuestApproveDto {
  @ApiProperty()
  approved: boolean;

  @ApiProperty()
  questId: string;
}
