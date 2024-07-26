import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  CreateScheduleCommand,
  CreateScheduleDTO,
  UpdateScheduleCommand,
  UpdateScheduleDTO,
} from '../core/application/schedule';
import { GetScheduleDoctorQuery } from '../core/application/schedule/queries';
import { Roles } from 'nest-keycloak-connect';

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

  @Put()
  @Roles({ roles: ['doctor'] })
  @HttpCode(HttpStatus.ACCEPTED)
  async UpdateSchedule(@Body() createSchedule: UpdateScheduleDTO) {
    return this._commandBus.execute(
      new UpdateScheduleCommand({ schedule: createSchedule }),
    );
  }

  @Post()
  @Roles({ roles: ['doctor'] })
  @HttpCode(HttpStatus.ACCEPTED)
  async CreateSchedule(@Body() createSchedule: CreateScheduleDTO) {
    return this._commandBus.execute(
      new CreateScheduleCommand({ schedules: createSchedule }),
    );
  }
}
