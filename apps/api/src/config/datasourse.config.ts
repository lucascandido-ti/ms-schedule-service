import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DataSourceOptions } from 'typeorm';

import { ENTITIES } from '../core/domain';

type MakeTypeOrmModuleOptionsProps = {
  dataSourceName: string;
  configPropertyPath: string;
  entities: DataSourceOptions['entities'];
  migrations?: string[];
  migrationsRun?: boolean;
  cli?: {
    migrationsDir: string;
  };
};

export const POSTGRES_DATA_SOURCE = 'postgres';
export const postgresTypeOrmModuleOptions = makeTypeOrmModuleOptions({
  dataSourceName: POSTGRES_DATA_SOURCE,
  configPropertyPath: 'db.postgres',
  entities: ENTITIES,
});

export function makeTypeOrmModuleOptions({
  dataSourceName,
  configPropertyPath,
  entities,
  migrations,
  migrationsRun,
  cli,
}: MakeTypeOrmModuleOptionsProps): TypeOrmModuleAsyncOptions {
  const logging = process.env['NODE_ENV'] !== 'production';

  return {
    name: dataSourceName,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const typeormConfig = configService.get(configPropertyPath)!;

      return {
        ...typeormConfig,
        entities,
        logging,
        migrations,
        migrationsRun,
        cli,
        synchronize: true,
      };
    },
  };
}
