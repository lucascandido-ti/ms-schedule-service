import { ConfigModule, ConfigService } from '@nestjs/config';

import { KeycloakConnectModuleAsyncOptions } from 'nest-keycloak-connect';

import { KeycloakConfig } from '../auth.config';

function keycloakRegister(): KeycloakConnectModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const keycloakConfig: KeycloakConfig =
        configService.get('auth.keycloak')!;

      return {
        authServerUrl: keycloakConfig.authServerUrl,
        realm: keycloakConfig.realm,
        clientId: keycloakConfig.clientId,
        secret: keycloakConfig.secret,
      };
    },
  };
}

export const keycloakConfigOptions = keycloakRegister();
