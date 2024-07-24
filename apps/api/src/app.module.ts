import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from './config';

@Module({
  imports: [ConfigModule.forRoot(ConfigModuleOptions)],
})
export class AppModule {}
