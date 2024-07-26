import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { POSTGRES_DATA_SOURCE } from '../config';
import {
  Doctor,
  IScheduleRepository,
  NotFoundDoctorException,
  NotFoundScheduleException,
  Schedule,
  ScheduleStatus,
} from '../core/domain';
import {
  CreateScheduleDTO,
  UpdateScheduleDTO,
} from '../core/application/schedule';

export class ScheduleRepository implements IScheduleRepository {
  private readonly logger = new Logger(ScheduleRepository.name);

  constructor(
    @InjectRepository(Schedule, POSTGRES_DATA_SOURCE)
    private readonly _scheduleRepository: Repository<Schedule>,
    @InjectRepository(Doctor, POSTGRES_DATA_SOURCE)
    private readonly _doctorRepository: Repository<Doctor>,
  ) {}

  async UpdateSchedule(schedule: UpdateScheduleDTO): Promise<Schedule> {
    const editSchedule = await this._scheduleRepository.findOneBy({
      id: schedule.scheduleId,
    });

    if (!editSchedule)
      throw new NotFoundScheduleException('Not found Schedule');

    editSchedule.date = schedule.date ?? editSchedule.date;
    editSchedule.startHour = schedule.startHour ?? editSchedule.startHour;
    editSchedule.finishHour = schedule.finishHour ?? editSchedule.finishHour;
    editSchedule.status = schedule.status ?? editSchedule.status;

    const scheduleEntity = await this._scheduleRepository.save(editSchedule);

    return scheduleEntity;
  }

  async ListScheduleDoctor(doctorId: number): Promise<Schedule[]> {
    const queryBuilder = this._scheduleRepository
      .createQueryBuilder('schedule')
      .innerJoinAndSelect('schedule.doctor', 'doctor')
      .where('doctor.id = :doctorId', { doctorId: doctorId })
      .orderBy('schedule.id', 'ASC');

    return queryBuilder.getMany();
  }

  async CreateSchedule(dto: CreateScheduleDTO): Promise<Schedule[]> {
    const { doctorId, schedules } = dto;

    const doctorEntity = await this._doctorRepository.findOneBy({
      id: doctorId,
    });

    if (!doctorEntity) throw new NotFoundDoctorException('Not found doctor');

    const scheduleBuilder: Schedule[] = [];

    schedules.map(({ date, hours }) => {
      hours.forEach(({ startHour, finishHour }) => {
        scheduleBuilder.push(
          this._scheduleRepository.create({
            doctor: doctorEntity,
            date,
            startHour,
            finishHour,
            status: ScheduleStatus.AVAILABLE,
            created_at: new Date(),
            updated_at: new Date(),
          }),
        );
      });
    });

    this.logger.debug(
      `Create schedule: payload: `,
      JSON.stringify(scheduleBuilder),
    );

    const scheduleEntity = await this._scheduleRepository.save(scheduleBuilder);

    this.logger.debug(
      `Create schedule: result: `,
      JSON.stringify(scheduleEntity),
    );

    return scheduleEntity;
  }
}
