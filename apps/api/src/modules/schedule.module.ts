import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';

import { Doctor, Schedule } from '../core/domain';
import { ScheduleRepository } from '../adapters';
import { ScheduleController } from '../consumers';
import { POSTGRES_DATA_SOURCE, SCHEDULE_REPOSITORY } from '../config';
import { CreateScheduleCommandHandler } from '../core/application/schedule';

const services: Provider[] = [];
const handlers: Provider[] = [CreateScheduleCommandHandler];
const repositories: Provider[] = [
  { provide: SCHEDULE_REPOSITORY, useClass: ScheduleRepository },
];
const controllers = [ScheduleController];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Schedule, Doctor], POSTGRES_DATA_SOURCE),
  ],
  controllers: [...controllers],
  providers: [...handlers, ...repositories, ...services],
})
export class ScheduleModule {}
