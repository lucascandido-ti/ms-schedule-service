import { Clinic } from './clinic.entity';
import { Doctor } from './doctor.entity';
import { Address } from './address.entity';
import { Specialtie } from './specialtie.entity';
import { Schedule } from './schedule.entity';

export { Address, Specialtie, Clinic, Doctor, Schedule };

export const ENTITIES = [Address, Specialtie, Clinic, Doctor, Schedule];

export type Entities = typeof ENTITIES;
