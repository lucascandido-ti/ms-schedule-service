import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CLINIC_REPOSITORY } from '@schedule/api/config';
import { IClinicRepository } from '@schedule/api/core/domain';

import { GetClinicQuery } from './get-clinics.query';

@CommandHandler(GetClinicQuery)
export class GetClinicQueryHandler implements ICommandHandler<GetClinicQuery> {
  constructor(
    @Inject(CLINIC_REPOSITORY)
    private readonly _clinicRepository: IClinicRepository,
  ) {}

  async execute(): Promise<any> {
    return this._clinicRepository.ListAllClinics();
  }
}
