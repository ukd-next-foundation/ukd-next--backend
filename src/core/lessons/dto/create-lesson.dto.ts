import { IRequirements } from '@app/core/classrooms/interfaces/classroom-features.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNumber()
  teacherId!: number;

  @ApiProperty()
  @IsNumber()
  departmentId!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  classroomRequirements?: IRequirements;
}
