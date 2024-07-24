import {
  Column,
  CreateDateColumn,
  ManyToMany,
  PrimaryColumn,
  Entity as TypeOrmEntity,
  UpdateDateColumn,
} from 'typeorm';

import { Clinic } from './clinic.entity';

import { Entity } from '@schedule/ddd';

@TypeOrmEntity()
export class Address extends Entity<number> {
  @PrimaryColumn('int8', { nullable: false, generated: true, primary: true })
  id: number;

  @Column('varchar', { nullable: false })
  street: string;

  @Column('integer', { nullable: false })
  number: number;

  @Column('varchar', { nullable: false })
  neighborhood: string;

  @Column('integer', { nullable: false })
  zip_code: number;

  @Column('varchar', { nullable: false })
  city: string;

  @Column('varchar', { nullable: false })
  country: string;

  @ManyToMany(() => Clinic, (clinic) => clinic.addresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  clinics: Clinic[];

  @CreateDateColumn({ nullable: false })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
