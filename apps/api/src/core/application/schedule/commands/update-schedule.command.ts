import { UpdateScheduleRequest } from '../requests';

export class UpdateScheduleCommand {
  constructor(public readonly request: UpdateScheduleRequest) {}
}
