import { IsDate, IsEnum, IsNumber } from 'class-validator';

import { Schedule, ScheduleStatus } from '@schedule/api/core/domain';

export class ScheduleDTO {
  @IsNumber()
  doctorId: number;

  @IsDate()
  date: Date;

  @IsDate()
  startHour: Date;

  @IsDate()
  finishHour: Date;

  @IsEnum(ScheduleStatus)
  status: ScheduleStatus;

  public MapToEntity(dto: ScheduleDTO): Schedule {
    const { date, startHour, finishHour, status } = dto;

    return {
      date,
      startHour,
      finishHour,
      status,
    } as Schedule;
  }

  public MapToDTO(entity: Schedule): ScheduleDTO {
    const { date, startHour, finishHour, status } = entity;

    return {
      date,
      startHour,
      finishHour,
      status,
    } as ScheduleDTO;
  }
}
