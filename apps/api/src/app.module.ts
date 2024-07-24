import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModuleOptions } from './config';

import { postgresTypeOrmModuleOptions } from './config/datasourse.config';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleOptions),
    TypeOrmModule.forRootAsync(postgresTypeOrmModuleOptions),
  ],
})
export class AppModule {}
