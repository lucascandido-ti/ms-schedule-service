import { In, Repository } from 'typeorm';

import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { POSTGRES_DATA_SOURCE } from '../config';
import { ClinicDTO } from '../core/application/clinic/dto';
import {
  Address,
  Clinic,
  IClinicRepository,
  Specialtie,
  Status,
} from '../core/domain';

export class ClinicRepository implements IClinicRepository {
  private readonly logger = new Logger(ClinicRepository.name);

  constructor(
    @InjectRepository(Clinic, POSTGRES_DATA_SOURCE)
    private readonly _clinicRepository: Repository<Clinic>,
    @InjectRepository(Address, POSTGRES_DATA_SOURCE)
    private readonly _addressRepository: Repository<Address>,
    @InjectRepository(Specialtie, POSTGRES_DATA_SOURCE)
    private readonly _specialtieRepository: Repository<Specialtie>,
  ) {}

  async ListAllClinics(): Promise<Clinic[]> {
    return this._clinicRepository.createQueryBuilder('clinic').getMany();
  }

  async CreateClinic(clinic: ClinicDTO): Promise<Clinic> {
    const { addresses, specialties } = clinic;

    const address = await this._addressRepository.save(
      this._addressRepository.create(addresses),
    );

    const cfms = specialties.map(({ cfm }) => cfm);
    const specialtie = await this._specialtieRepository.findBy({
      cfm: In(cfms),
    });

    const payload = {
      name: clinic.name,
      description: clinic.description,
      cnpj_code: clinic.cnpj_code,
      company_name: clinic.company_name,
      contact: clinic.contact,
      bussiness_hour: clinic.bussiness_hour,
      addresses: address,
      specialties: specialtie,
      status: Status.ACTIVE,
      created_at: new Date(),
      updated_at: new Date(),
    } as Clinic;

    this.logger.debug(`Create clinic: payload: `, payload);

    const clinicEntity = await this._clinicRepository.save(
      this._clinicRepository.create(payload),
    );

    this.logger.debug(`CreateClinic: result: `, specialtie);

    return clinicEntity;
  }
}
