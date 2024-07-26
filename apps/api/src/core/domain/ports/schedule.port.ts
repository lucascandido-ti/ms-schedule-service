import { Schedule } from '../entities';
import {
  CreateScheduleDTO,
  UpdateScheduleDTO,
} from '../../application/schedule';

export interface IScheduleRepository {
  ListScheduleDoctor(doctorId: number): Promise<Schedule[]>;
  CreateSchedule(schedule: CreateScheduleDTO): Promise<Schedule[]>;
  UpdateSchedule(schedule: UpdateScheduleDTO): Promise<Schedule>;
}
