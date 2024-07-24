import { Response } from '@schedule/api/core/domain';
import { SpecialtieDTO } from '../dto';

export class SpecialtieResponse extends Response {
  public Data: SpecialtieDTO;

  constructor(Data: SpecialtieDTO) {
    super();

    this.Data = Data;
  }
}
