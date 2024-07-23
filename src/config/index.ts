import { join } from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

import defaultSettingsJson from '@/settings.json';
import { getConfigModuleOptions } from './utils';
import { ApiConfig } from './api.config';
import { IsInstance, ValidateNested } from 'class-validator';

export class Config {
  @ValidateNested({ each: true })
  @IsInstance(ApiConfig)
  api: ApiConfig;
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
