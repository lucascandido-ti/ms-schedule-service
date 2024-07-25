import { Response } from '@schedule/api/core/domain';
import { ClinicDTO } from '../dto';

export class ClinicResponse extends Response {
  public Data: ClinicDTO;
  constructor(Data: ClinicDTO) {
    super();

    this.Data = Data;
  }
}
