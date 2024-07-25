import { Doctor } from '../entities';
import { DoctorDTO } from '../../application/doctor';

export interface IDoctorRepository {
  CreateDoctor(doctor: DoctorDTO): Promise<Doctor>;
}
