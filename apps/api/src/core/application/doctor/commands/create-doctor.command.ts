import { CreateDoctorRequest } from '../requests';

export class CreateDoctorCommand {
  constructor(public readonly request: CreateDoctorRequest) {}
}
