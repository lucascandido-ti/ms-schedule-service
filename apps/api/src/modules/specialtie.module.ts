import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';

import { Specialtie } from '../core/domain';
import { SpecialtieRepository } from '../adapters';
import { SpecialtieController } from '../consumers';
import { POSTGRES_DATA_SOURCE, SPECIALTIE_REPOSITORY } from '../config';
import { CreateSpecialtieCommandHandler } from '../core/application/specialtie';
import { GetSpecialtiesQueryHandler } from '../core/application/specialtie/queries';

const controllers = [SpecialtieController];
const handlers: Provider[] = [
  GetSpecialtiesQueryHandler,
  CreateSpecialtieCommandHandler,
];
const repositories: Provider[] = [
  { provide: SPECIALTIE_REPOSITORY, useClass: SpecialtieRepository },
];
const services: Provider[] = [];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Specialtie], POSTGRES_DATA_SOURCE),
  ],
  controllers: [...controllers],
  providers: [...handlers, ...repositories, ...services],
})
export class SpecialtieModule {}
