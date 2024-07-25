import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SCHEDULE_REPOSITORY } from '@schedule/api/config';
import { IScheduleRepository } from '@schedule/api/core/domain';

import { ScheduleDTO } from '../dto';
import { ScheduleResponse } from '../responses';
import { CreateScheduleCommand } from './create-schedule.command';

@CommandHandler(CreateScheduleCommand)
export class CreateScheduleCommandHandler
  implements ICommandHandler<CreateScheduleCommand>
{
  constructor(
    @Inject(SCHEDULE_REPOSITORY)
    private readonly _scheduleRepository: IScheduleRepository,
  ) {}

  async execute({ request }: CreateScheduleCommand): Promise<any> {
    const schedules = await this._scheduleRepository.CreateSchedule(
      request.schedules,
    );

    const scheduleDto = schedules.map((schedule) =>
      new ScheduleDTO().MapToDTO(schedule),
    );

    const response = new ScheduleResponse(scheduleDto);
    response.Success = true;

    return response;
  }
}
