import {
  Column,
  CreateDateColumn,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
  Entity as TypeOrmEntity,
} from 'typeorm';

import { Status } from '../enum';
import { Doctor } from './doctor.entity';
import { Clinic } from './clinic.entity';
import { Entity } from '@schedule/ddd';

@TypeOrmEntity()
export class Specialtie extends Entity<number> {
  @PrimaryColumn('int8', { nullable: false, generated: true, primary: true })
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  description: string;

  @Column('varchar', { nullable: false })
  cfm: string;

  @Column('varchar', { nullable: false })
  status: Status;

  @ManyToMany(() => Clinic, (clinic) => clinic.specialties, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  clinics: Clinic[];

  @ManyToMany(() => Doctor, (doctor) => doctor.specialties, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  doctors: Doctor[];

  @CreateDateColumn({ nullable: false })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
