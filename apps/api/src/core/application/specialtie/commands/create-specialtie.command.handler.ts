import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SPECIALTIE_SERVICE } from '@schedule/api/config';
import { ISpecialtieRepository } from '@schedule/api/core/domain';

import { CreateSpecialtieCommand } from './create-specialtie.command';

@CommandHandler(CreateSpecialtieCommand)
export class CreateSpecialtieCommandHandler
  implements ICommandHandler<CreateSpecialtieCommand>
{
  constructor(
    @Inject(SPECIALTIE_SERVICE)
    private readonly _specialtieRepository: ISpecialtieRepository,
  ) {}

  async execute({ request }: CreateSpecialtieCommand) {
    console.log('_specialtieRepository', this._specialtieRepository);
    console.log('request', request);
    throw new Error('Method not implemented.');
  }
}
