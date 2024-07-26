import { IsInstance, IsString, ValidateNested } from 'class-validator';

export class KeycloakConfig {
  @IsString()
  authServerUrl: string;

  @IsString()
  realm: string;

  @IsString()
  clientId: string;

  @IsString()
  secret: string;
}

export class AuthConfig {
  @ValidateNested({ each: true })
  @IsInstance(KeycloakConfig)
  keycloak: KeycloakConfig;
}
