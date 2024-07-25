import { Schedule } from '../entities';
import { CreateScheduleDTO } from '../../application/schedule';

export interface IScheduleRepository {
  ListScheduleDoctor(doctorId: number): Promise<Schedule[]>;
  CreateSchedule(schedule: CreateScheduleDTO): Promise<Schedule[]>;
}
