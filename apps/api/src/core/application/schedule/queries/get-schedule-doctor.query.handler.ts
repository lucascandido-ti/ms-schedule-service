import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetScheduleDoctorQuery } from './get-schedule-doctor.query';
import { IScheduleRepository } from '@schedule/api/core/domain';
import { Inject } from '@nestjs/common';
import { SCHEDULE_REPOSITORY } from '@schedule/api/config';

@CommandHandler(GetScheduleDoctorQuery)
export class GetScheduleDoctorQueryHandler
  implements ICommandHandler<GetScheduleDoctorQuery>
{
  constructor(
    @Inject(SCHEDULE_REPOSITORY)
    private readonly _scheduleRepository: IScheduleRepository,
  ) {}

  execute({ request }: GetScheduleDoctorQuery): Promise<any> {
    return this._scheduleRepository.ListScheduleDoctor(request.doctorId);
  }
}
