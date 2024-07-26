import { ScheduleStatus } from '@schedule/api/core/domain';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateScheduleDTO {
  @IsNumber()
  scheduleId: number;

  @IsDate()
  @IsOptional()
  date: Date;

  @IsDate()
  @IsOptional()
  startHour: Date;

  @IsDate()
  @IsOptional()
  finishHour: Date;

  @IsEnum(ScheduleStatus)
  @IsOptional()
  status: ScheduleStatus;
}
