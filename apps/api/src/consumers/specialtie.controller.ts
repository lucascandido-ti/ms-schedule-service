import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';

import {
  CreateSpecialtieCommand,
  SpecialtieDTO,
} from '../core/application/specialtie';

import { Specialtie } from '../core/domain';
import { GetSpecialtiesQuery } from '../core/application/specialtie/queries/get-specialties.query';
import { Roles } from 'nest-keycloak-connect';

@Controller('specialtie')
export class SpecialtieController {
  private readonly logger = new Logger(SpecialtieController.name);
  constructor(private commandBus: CommandBus) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async GetSpecialties() {
    this.logger.debug('List specialties...');
    return this.commandBus.execute(new GetSpecialtiesQuery());
  }

  @Post()
  @Roles({ roles: ['doctor'] })
  @HttpCode(HttpStatus.ACCEPTED)
  async CreateSpecialtie(
    @Body() createSpecialtie: SpecialtieDTO,
  ): Promise<Specialtie> {
    this.logger.debug('New create specialtie request...');
    return this.commandBus.execute(
      new CreateSpecialtieCommand({ specialtie: createSpecialtie }),
    );
  }
}
