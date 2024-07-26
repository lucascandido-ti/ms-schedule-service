import { ConfigService } from '@nestjs/config';
import { Controller, Get, Req, Res } from '@nestjs/common';

import { Response } from 'express';

import { ApiConfig, KeycloakConfig } from '../config';
import { Public } from 'nest-keycloak-connect';

@Controller('auth')
export class AuthController {
  private readonly apiConfig: ApiConfig;
  private readonly keycloakConfig: KeycloakConfig;

  constructor(configService: ConfigService) {
    this.apiConfig = configService.get('api')!;
    this.keycloakConfig = configService.get('auth.keycloak')!;
  }

  @Get('login')
  @Public(true)
  async login(@Req() _: Request, @Res() res: Response) {
    const { authServerUrl, realm, clientId } = this.keycloakConfig;

    const redirectUri = encodeURIComponent(this.apiConfig.url);
    const authorizationUrl = `${authServerUrl}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;

    res.redirect(authorizationUrl);
  }
}
