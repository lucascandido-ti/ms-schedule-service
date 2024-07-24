import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetSpecialtiesQuery } from './get-specialties.query';
import { Inject } from '@nestjs/common';
import { SPECIALTIE_REPOSITORY } from '@schedule/api/config';
import { ISpecialtieRepository } from '@schedule/api/core/domain';

@CommandHandler(GetSpecialtiesQuery)
export class GetSpecialtiesQueryHandler
  implements ICommandHandler<GetSpecialtiesQuery>
{
  constructor(
    @Inject(SPECIALTIE_REPOSITORY)
    private readonly _specialtieRepository: ISpecialtieRepository,
  ) {}

  execute(): Promise<any> {
    return this._specialtieRepository.ListSpecialties();
  }
}
