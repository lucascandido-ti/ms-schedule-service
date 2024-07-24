import { SpecialtieDTO } from '../core/application/specialtie';
import { ISpecialtieRepository, Specialtie } from '../core/domain';

export class SpecialtieRepository implements ISpecialtieRepository {
  CreateSpecialtie(_: SpecialtieDTO): Promise<Specialtie> {
    throw new Error('Method not implemented.');
  }
}
