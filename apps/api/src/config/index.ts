import _ from 'lodash';
import { join } from 'path';
import { readFileSync } from 'fs';
import { IsInstance, ValidateNested } from 'class-validator';

import defaultSettingsJson from '@schedule/api/settings.json';

import { DbConfig } from './db.config';
import { ApiConfig } from './api.config';

import { getConfigModuleOptions } from './utils';

export class Config {
  @ValidateNested({ each: true })
  @IsInstance(ApiConfig)
  api: ApiConfig;

  @ValidateNested({ each: true })
  @IsInstance(DbConfig)
  db: DbConfig;
}

function getConfigJson() {
  try {
    const configJsonPath = join(process.cwd(), 'settings.json');
    const configJsonString = readFileSync(configJsonPath, {
      encoding: 'utf-8',
    });

    const configJson = JSON.parse(configJsonString);

    return _.merge(defaultSettingsJson, configJson);
  } catch (error) {
    return defaultSettingsJson;
  }
}

export const ConfigModuleOptions = getConfigModuleOptions(
  Config,
  getConfigJson(),
);
