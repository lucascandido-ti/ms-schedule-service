import { CreateScheduleRequest } from '../requests';

export class CreateScheduleCommand {
  constructor(public readonly request: CreateScheduleRequest) {}
}
