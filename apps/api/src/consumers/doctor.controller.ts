import { CommandBus } from '@nestjs/cqrs';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateDoctorCommand, DoctorDTO } from '../core/application/doctor';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async CreateDoctor(@Body() createDoctor: DoctorDTO) {
    return this.commandBus.execute(
      new CreateDoctorCommand({ doctor: createDoctor }),
    );
  }
}
