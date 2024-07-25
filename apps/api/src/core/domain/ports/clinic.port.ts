import { Clinic } from '../entities';
import { ClinicDTO } from '../../application/clinic/dto';

export interface IClinicRepository {
  CreateClinic(clinic: ClinicDTO): Promise<Clinic>;
}
