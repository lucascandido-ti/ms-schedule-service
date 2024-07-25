import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { ClinicDTO } from '../core/application/clinic/dto';
import { GetClinicQuery } from '../core/application/clinic/queries';
import { CreateClinicCommand } from '../core/application/clinic/commands';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async GetClinics() {
    return this.commandBus.execute(new GetClinicQuery());
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async CreateClinic(@Body() createClinic: ClinicDTO) {
    return this.commandBus.execute(
      new CreateClinicCommand({ clinic: createClinic }),
    );
  }
}
