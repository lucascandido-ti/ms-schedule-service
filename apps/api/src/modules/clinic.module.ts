import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';

import { ClinicRepository } from '../adapters';
import { ClinicController } from '../consumers';
import { Address, Clinic, Specialtie } from '../core/domain';
import { CLINIC_REPOSITORY, POSTGRES_DATA_SOURCE } from '../config';
import { CreateClinicCommandHandler } from '../core/application/clinic/commands';

const services: Provider[] = [];
const handlers: Provider[] = [CreateClinicCommandHandler];
const repositories: Provider[] = [
  { provide: CLINIC_REPOSITORY, useClass: ClinicRepository },
];
const controllers = [ClinicController];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(
      [Clinic, Address, Specialtie],
      POSTGRES_DATA_SOURCE,
    ),
  ],
  controllers: [...controllers],
  providers: [...handlers, ...repositories, ...services],
})
export class ClinicModule {}
