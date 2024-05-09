import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateJournalDto } from './create-journal.dto';
import { IsNumber } from 'class-validator';

export class UpdateJournalDto extends PartialType(CreateJournalDto) {
  @ApiProperty()
  @IsNumber()
  id!: number;
}
