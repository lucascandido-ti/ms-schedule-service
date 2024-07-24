import {
  Column,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
  Entity as TypeOrmEntity,
} from 'typeorm';

import { Entity } from '@schedule/ddd';

import { IBussinessHour, IContactOptions } from '../interfaces';

import { Status } from '../enum';

import { Doctor } from './doctor.entity';
import { Address } from './address.entity';
import { Specialtie } from './specialtie.entity';

@TypeOrmEntity()
export class Clinic extends Entity<number> {
  @PrimaryColumn('int8', { nullable: false, generated: true, primary: true })
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  description: string;

  @Column('varchar', { nullable: false })
  cnpj_code: string;

  @Column('varchar', { nullable: false })
  company_name: string;

  @Column('jsonb', { nullable: false })
  contact: IContactOptions;

  @Column('jsonb', { nullable: false })
  bussiness_hour: IBussinessHour;

  @Column('varchar', { nullable: false })
  status: Status;

  @ManyToMany(() => Address, (address) => address.clinics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'addressesClinics',
    joinColumn: { name: 'clinicId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'addressId', referencedColumnName: 'id' },
  })
  addresses: Address[];

  @ManyToMany(() => Specialtie, (specialtie) => specialtie.clinics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'specialtiesClinics',
    joinColumn: { name: 'clinicId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'specialtieId', referencedColumnName: 'id' },
  })
  specialties: Specialtie[];

  @ManyToMany(() => Doctor, (doctor) => doctor.clinics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  doctors: Doctor[];

  @CreateDateColumn({ nullable: false })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
