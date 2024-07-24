import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';

import { SPECIALTIE_SERVICE } from '../config';
import { SpecialtieRepository } from '../adapters';
import { CreateSpecialtieCommandHandler } from '../core/application/specialtie';
import { SpecialtieController } from '../consumers';

const handlers: Provider[] = [CreateSpecialtieCommandHandler];
const controllers = [SpecialtieController];
const services: Provider[] = [];
const repositories: Provider[] = [
  { provide: SPECIALTIE_SERVICE, useClass: SpecialtieRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [...handlers, ...repositories, ...services],
})
export class SpecialtieModule {}
