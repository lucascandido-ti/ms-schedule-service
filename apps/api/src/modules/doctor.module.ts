import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';

import { Clinic, Doctor, Schedule, Specialtie } from '../core/domain';
import { DoctorRepository } from '../adapters';
import { DoctorController } from '../consumers';
import { DOCTOR_REPOSITORY, POSTGRES_DATA_SOURCE } from '../config';
import { CreateDoctorCommandHandler } from '../core/application/doctor';

const services: Provider[] = [];
const handlers: Provider[] = [CreateDoctorCommandHandler];
const repositories: Provider[] = [
  { provide: DOCTOR_REPOSITORY, useClass: DoctorRepository },
];
const controllers = [DoctorController];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(
      [Doctor, Clinic, Specialtie, Schedule],
      POSTGRES_DATA_SOURCE,
    ),
  ],
  controllers: [...controllers],
  providers: [...handlers, ...repositories, ...services],
})
export class DoctorModule {}
