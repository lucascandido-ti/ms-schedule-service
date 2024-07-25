import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModuleOptions, postgresTypeOrmModuleOptions } from './config';

import { ClinicModule, DoctorModule, SpecialtieModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleOptions),
    TypeOrmModule.forRootAsync(postgresTypeOrmModuleOptions),
    SpecialtieModule,
    ClinicModule,
    DoctorModule,
  ],
})
export class AppModule {}
