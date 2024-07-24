import {
  Column,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
  Entity as TypeOrmEntity,
  OneToMany,
} from 'typeorm';

import { Status } from '../enum';
import { IServiceOptions } from '../interfaces';

import { Specialtie } from './specialtie.entity';
import { Clinic } from './clinic.entity';
import { Entity } from '@schedule/ddd';
import { Schedule } from './schedule.entity';

@TypeOrmEntity()
export class Doctor extends Entity<number> {
  @PrimaryColumn('int8', { nullable: false, generated: true, primary: true })
  id: number;

  @Column('varchar', { nullable: false })
  user_id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  last_name: string;

  @Column('varchar', { nullable: false })
  email: string;

  @Column('varchar', { nullable: false })
  crm_code: number;

  @Column('jsonb', { nullable: false })
  service_options: IServiceOptions;

  @Column('varchar', { nullable: false })
  status: Status;

  @OneToMany(() => Schedule, (schedule) => schedule.doctor)
  schedule: Schedule;

  @ManyToMany(() => Specialtie, (specialtie) => specialtie.doctors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'specialtiesDoctors',
    joinColumn: { name: 'doctorId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'specialtieId', referencedColumnName: 'id' },
  })
  specialties: Specialtie[];

  @ManyToMany(() => Clinic, (clinic) => clinic.doctors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'clinicsDoctors',
    joinColumn: { name: 'doctorId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'clinicId', referencedColumnName: 'id' },
  })
  clinics: Clinic[];

  @CreateDateColumn({ nullable: false })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
