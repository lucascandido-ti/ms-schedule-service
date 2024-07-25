import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DOCTOR_REPOSITORY } from '@schedule/api/config';
import { Doctor, IDoctorRepository } from '@schedule/api/core/domain';

import { GetDoctorsQuery } from './get-doctors.query';

@CommandHandler(GetDoctorsQuery)
export class GetDoctorsQueryHandler
  implements ICommandHandler<GetDoctorsQuery>
{
  constructor(
    @Inject(DOCTOR_REPOSITORY)
    private readonly _doctorRepository: IDoctorRepository,
  ) {}

  execute(): Promise<Doctor[]> {
    return this._doctorRepository.ListAllDoctors();
  }
}
