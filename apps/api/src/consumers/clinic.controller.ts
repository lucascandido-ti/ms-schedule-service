import { CommandBus } from '@nestjs/cqrs';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ClinicDTO } from '../core/application/clinic/dto';
import { CreateClinicCommand } from '../core/application/clinic/commands';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async CreateClinic(@Body() createClinic: ClinicDTO) {
    return this.commandBus.execute(
      new CreateClinicCommand({ clinic: createClinic }),
    );
  }
}
