import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SCHEDULE_REPOSITORY } from '@schedule/api/config';
import { IScheduleRepository } from '@schedule/api/core/domain';

import { ScheduleDTO } from '../dto';
import { ScheduleResponse } from '../responses';
import { UpdateScheduleCommand } from './update-schedule.command';

@CommandHandler(UpdateScheduleCommand)
export class UpdateScheduleCommandHandler
  implements ICommandHandler<UpdateScheduleCommand>
{
  constructor(
    @Inject(SCHEDULE_REPOSITORY)
    private readonly _scheduleRepository: IScheduleRepository,
  ) {}

  async execute({ request }: UpdateScheduleCommand): Promise<any> {
    const schedule = await this._scheduleRepository.UpdateSchedule(
      request.schedule,
    );

    const scheduleDto = new ScheduleDTO().MapToDTO(schedule);

    const response = new ScheduleResponse(scheduleDto);
    response.Success = true;

    return;
  }
}
