import { Doctor } from '../entities';
import { DoctorDTO } from '../../application/doctor';

export interface IDoctorRepository {
  ListAllDoctors(): Promise<Doctor[]>;
  CreateDoctor(doctor: DoctorDTO): Promise<Doctor>;
}
