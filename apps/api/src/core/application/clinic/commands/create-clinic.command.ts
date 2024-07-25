import { CreateClinicRequest } from '../requests';

export class CreateClinicCommand {
  constructor(public readonly request: CreateClinicRequest) {}
}
