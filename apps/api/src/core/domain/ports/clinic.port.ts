import { Clinic } from '../entities';
import { ClinicDTO } from '../../application/clinic/dto';

export interface IClinicRepository {
  ListAllClinics(): Promise<Clinic[]>;
  CreateClinic(clinic: ClinicDTO): Promise<Clinic>;
}
