import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Entity as TypeOrmEntity,
  UpdateDateColumn,
} from 'typeorm';

import { Entity } from '@schedule/ddd';

import { ScheduleStatus } from '../enum';
import { Doctor } from './doctor.entity';

@TypeOrmEntity()
export class Schedule extends Entity<number> {
  @PrimaryColumn('int8', { nullable: false, generated: true, primary: true })
  id: number;

  @Column('date', { nullable: false })
  date: Date;

  @Column('time', { nullable: false })
  startHour: Date;

  @Column('time', { nullable: false })
  finishHour: Date;

  @Column('varchar', { nullable: false })
  status: ScheduleStatus;

  @ManyToOne(() => Doctor, (doctor) => doctor.schedule)
  @JoinColumn({
    name: 'doctorId',
    referencedColumnName: 'id',
  })
  doctor: Doctor;

  @CreateDateColumn({ nullable: false })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
