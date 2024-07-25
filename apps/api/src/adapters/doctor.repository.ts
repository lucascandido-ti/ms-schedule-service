import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import {
  Clinic,
  Doctor,
  IDoctorRepository,
  Specialtie,
  Status,
} from '../core/domain';
import { POSTGRES_DATA_SOURCE } from '../config';
import { DoctorDTO } from '../core/application/doctor';

export class DoctorRepository implements IDoctorRepository {
  private readonly logger = new Logger(DoctorRepository.name);

  constructor(
    @InjectRepository(Doctor, POSTGRES_DATA_SOURCE)
    private readonly _doctorRepositoy: Repository<Doctor>,
    @InjectRepository(Clinic, POSTGRES_DATA_SOURCE)
    private readonly _clinicRepository: Repository<Clinic>,
    @InjectRepository(Specialtie, POSTGRES_DATA_SOURCE)
    private readonly _specialtieRepository: Repository<Specialtie>,
  ) {}

  async ListAllDoctors(): Promise<Doctor[]> {
    return this._doctorRepositoy.createQueryBuilder('doctors').getMany();
  }

  async CreateDoctor(doctor: DoctorDTO): Promise<Doctor> {
    const { clinics, specialties } = doctor;

    const cnpjs = clinics.map((clinic) => clinic.cnpj_code);

    const clinicsEntity = await this._clinicRepository.findBy({
      cnpj_code: In(cnpjs),
    });

    const specialtiesEntity = await this._specialtieRepository.findBy({
      cfm: In(specialties.map(({ cfm }) => cfm)),
    });

    const doctorBuilder = this._doctorRepositoy.create({
      name: doctor.name,
      user_id: doctor.user_id,
      last_name: doctor.last_name,
      email: doctor.email,
      crm_code: doctor.crm_code,
      service_options: doctor.service_options,
      clinics: clinicsEntity,
      specialties: specialtiesEntity,
      status: Status.ACTIVE,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.logger.debug(`Create doctor: payload: `, doctorBuilder);

    const doctorEntity = await this._doctorRepositoy.save(
      this._doctorRepositoy.create(doctorBuilder),
    );

    this.logger.debug(`Create doctor: doctor: `, doctorEntity);

    return doctorEntity;
  }
}
