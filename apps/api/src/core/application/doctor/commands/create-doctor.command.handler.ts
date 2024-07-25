import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DOCTOR_REPOSITORY } from '@schedule/api/config';
import { IDoctorRepository } from '@schedule/api/core/domain';

import { DoctorDTO } from '../dto';
import { DoctorResponse } from '../responses';
import { CreateDoctorCommand } from './create-doctor.command';

@CommandHandler(CreateDoctorCommand)
export class CreateDoctorCommandHandler
  implements ICommandHandler<CreateDoctorCommand>
{
  constructor(
    @Inject(DOCTOR_REPOSITORY)
    private readonly _doctorRepository: IDoctorRepository,
  ) {}
  async execute({ request }: CreateDoctorCommand): Promise<any> {
    const doctor = await this._doctorRepository.CreateDoctor(request.doctor);

    const doctorDto = new DoctorDTO().MapToDTO(doctor);

    const response = new DoctorResponse(doctorDto);
    response.Success = true;

    return response;
  }
}
