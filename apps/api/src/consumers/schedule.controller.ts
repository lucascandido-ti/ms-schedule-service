import { CommandBus } from '@nestjs/cqrs';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import {
  CreateScheduleCommand,
  CreateScheduleDTO,
} from '../core/application/schedule';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly _commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async CreateSchedule(@Body() createSchedule: CreateScheduleDTO) {
    return this._commandBus.execute(
      new CreateScheduleCommand({ schedules: createSchedule }),
    );
  }
}
