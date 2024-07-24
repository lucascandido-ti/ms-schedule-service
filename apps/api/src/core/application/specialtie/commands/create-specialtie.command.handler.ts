import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SPECIALTIE_REPOSITORY } from '@schedule/api/config';
import { ISpecialtieRepository } from '@schedule/api/core/domain';

import { CreateSpecialtieCommand } from './create-specialtie.command';
import { SpecialtieDTO } from '../dto';
import { SpecialtieResponse } from '../responses';

@CommandHandler(CreateSpecialtieCommand)
export class CreateSpecialtieCommandHandler
  implements ICommandHandler<CreateSpecialtieCommand>
{
  constructor(
    @Inject(SPECIALTIE_REPOSITORY)
    private readonly _specialtieRepository: ISpecialtieRepository,
  ) {}

  async execute({ request }: CreateSpecialtieCommand) {
    const specialtie = await this._specialtieRepository.CreateSpecialtie(
      request.specialtie,
    );

    const specialtieDto = new SpecialtieDTO().MapToDTO(specialtie);

    const response = new SpecialtieResponse(specialtieDto);
    response.Success = true;

    return response;
  }
}
