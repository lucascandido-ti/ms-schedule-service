import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import {
  CreateScheduleCommand,
  CreateScheduleDTO,
} from '../core/application/schedule';
import { GetScheduleDoctorQuery } from '../core/application/schedule/queries';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly _commandBus: CommandBus) {}

  @Get('/:doctorId')
  @HttpCode(HttpStatus.OK)
  async ListScheduleDoctor(@Param('doctorId') doctorId: number) {
    return this._commandBus.execute(
      new GetScheduleDoctorQuery({ doctorId: doctorId }),
    );
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async CreateSchedule(@Body() createSchedule: CreateScheduleDTO) {
    return this._commandBus.execute(
      new CreateScheduleCommand({ schedules: createSchedule }),
    );
  }
}
