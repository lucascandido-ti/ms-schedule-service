import { Response } from '@schedule/api/core/domain';

import { DoctorDTO } from '../dto';

export class DoctorResponse extends Response {
  public Data: DoctorDTO;

  constructor(Data: DoctorDTO) {
    super();

    this.Data = Data;
  }
}
