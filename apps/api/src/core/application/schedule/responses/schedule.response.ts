import { Response } from '@schedule/api/core/domain';

import { ScheduleDTO } from '../dto';

export class ScheduleResponse extends Response {
  public Data: ScheduleDTO[] | ScheduleDTO;

  constructor(Data: ScheduleDTO[] | ScheduleDTO) {
    super();

    this.Data = Data;
  }
}
