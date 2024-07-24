import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

import { Foo } from '@schedule/core';
import { AggregateRoot } from '@schedule/ddd';

import { Config } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const config = (configService as unknown as { internalConfig: Config })
    .internalConfig;

  testLocalDependecies();

  app.setGlobalPrefix(config.api.prefix);
  await app.listen(+config.api.port);
}

bootstrap();

function testLocalDependecies() {
  const core = new Foo();
  console.log('@schedule/core: test > ', core);

  const ddd = class DDD extends AggregateRoot<any> {};

  console.log('@schedule/ddd: test > ', ddd);
}
