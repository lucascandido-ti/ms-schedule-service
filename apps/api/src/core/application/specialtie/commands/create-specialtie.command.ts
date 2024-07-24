import { CreateSpecialtieRequest } from '../requests';

export class CreateSpecialtieCommand {
  constructor(public readonly request: CreateSpecialtieRequest) {}
}
