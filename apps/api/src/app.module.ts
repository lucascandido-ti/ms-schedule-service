import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModuleOptions, postgresTypeOrmModuleOptions } from './config';

import {
  ClinicModule,
  DoctorModule,
  SpecialtieModule,
  ScheduleModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleOptions),
    TypeOrmModule.forRootAsync(postgresTypeOrmModuleOptions),
    SpecialtieModule,
    ClinicModule,
    DoctorModule,
    ScheduleModule,
  ],
})
export class AppModule {}
