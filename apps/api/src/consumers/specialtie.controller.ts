import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
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

@Controller('specialtie')
export class SpecialtieController {
  private readonly logger = new Logger(SpecialtieController.name);
  constructor(private commandBus: CommandBus) {}

  @Post()
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
