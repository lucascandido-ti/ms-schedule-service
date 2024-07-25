import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';

import { DoctorRepository } from '../adapters';
import { DoctorController } from '../consumers';
import { DOCTOR_REPOSITORY, POSTGRES_DATA_SOURCE } from '../config';
import { Clinic, Doctor, Schedule, Specialtie } from '../core/domain';

import {
  CreateDoctorCommandHandler,
  GetDoctorsQueryHandler,
} from '../core/application/doctor';

const services: Provider[] = [];
const handlers: Provider[] = [
  GetDoctorsQueryHandler,
  CreateDoctorCommandHandler,
];
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
