import { Schedule } from '../entities';
import { CreateScheduleDTO } from '../../application/schedule';

export interface IScheduleRepository {
  CreateSchedule(schedule: CreateScheduleDTO): Promise<Schedule[]>;
}
