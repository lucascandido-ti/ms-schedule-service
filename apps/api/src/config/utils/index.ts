import {
  ConfigFactory,
  ConfigModuleOptions,
  ConfigObject,
} from '@nestjs/config';

import { validateSync } from 'class-validator';
import { ClassConstructor, plainToClass } from 'class-transformer';

export * from './auth.utils';

function loadJsonFactory<T>(
  constructor: ClassConstructor<T>,
  config: Record<string, unknown>,
): () => T {
  function loadJson() {
    const validatedConfig = plainToClass(constructor, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig as Record<string, unknown>, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) throw new Error(errors.toString());

    return validatedConfig;
  }

  return loadJson;
}

export function getConfigModuleOptions<T>(
  configClass: ClassConstructor<T>,
  configJson: Record<string, unknown>,
): ConfigModuleOptions {
  return {
    isGlobal: true,
    ignoreEnvVars: true,
    load: [
      loadJsonFactory(configClass, configJson) as ConfigFactory<ConfigObject>,
    ],
  };
}
