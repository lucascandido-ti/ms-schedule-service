import { Clinic } from './clinic.entity';
import { Doctor } from './doctor.entity';
import { Address } from './address.entity';
import { Specialtie } from './specialtie.entity';

export { Address, Specialtie, Clinic, Doctor };

export const ENTITIES = [Address, Specialtie, Clinic, Doctor];

export type Entities = typeof ENTITIES;
