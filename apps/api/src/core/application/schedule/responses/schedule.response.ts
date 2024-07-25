import { Response } from '@schedule/api/core/domain';

import { ScheduleDTO } from '../dto';

export class ScheduleResponse extends Response {
  public Data: ScheduleDTO[];

  constructor(Data: ScheduleDTO[]) {
    super();

    this.Data = Data;
  }
}
