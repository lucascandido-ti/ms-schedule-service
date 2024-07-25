import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { CreateDoctorCommand, DoctorDTO } from '../core/application/doctor';
import { GetDoctorsQuery } from '../core/application/doctor/queries/get-doctors.query';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async ListAllDoctors() {
    return this.commandBus.execute(new GetDoctorsQuery());
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async CreateDoctor(@Body() createDoctor: DoctorDTO) {
    return this.commandBus.execute(
      new CreateDoctorCommand({ doctor: createDoctor }),
    );
  }
}
