import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IClinicRepository } from '@schedule/api/core/domain';
import { CLINIC_REPOSITORY } from '@schedule/api/config';

import { ClinicDTO } from '../dto';
import { ClinicResponse } from '../responses';
import { CreateClinicCommand } from './create-clinic.command';

@CommandHandler(CreateClinicCommand)
export class CreateClinicCommandHandler
  implements ICommandHandler<CreateClinicCommand>
{
  constructor(
    @Inject(CLINIC_REPOSITORY)
    private readonly _clinicRepository: IClinicRepository,
  ) {}

  async execute({ request }: CreateClinicCommand): Promise<any> {
    const clinic = await this._clinicRepository.CreateClinic(request.clinic);

    const clinicDto = new ClinicDTO().MapToDTO(clinic);

    const response = new ClinicResponse(clinicDto);
    response.Success = true;

    return response;
  }
}
