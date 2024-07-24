import { Specialtie } from '../entities';
import { SpecialtieDTO } from '../../application/specialtie/dto';

export interface ISpecialtieRepository {
  ListSpecialties(): Promise<Specialtie[]>;
  CreateSpecialtie(specialtie: SpecialtieDTO): Promise<Specialtie>;
}
