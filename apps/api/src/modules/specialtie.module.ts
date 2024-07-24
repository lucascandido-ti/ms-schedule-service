import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';

import { POSTGRES_DATA_SOURCE, SPECIALTIE_REPOSITORY } from '../config';
import { SpecialtieRepository } from '../adapters';
import { SpecialtieController } from '../consumers';
import { CreateSpecialtieCommandHandler } from '../core/application/specialtie';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialtie } from '../core/domain';

const controllers = [SpecialtieController];
const handlers: Provider[] = [CreateSpecialtieCommandHandler];
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
