import { Specialtie } from '../entities';
import { SpecialtieDTO } from '../../application/specialtie/dto';

export interface ISpecialtieRepository {
  CreateSpecialtie(specialtie: SpecialtieDTO): Promise<Specialtie>;
}
