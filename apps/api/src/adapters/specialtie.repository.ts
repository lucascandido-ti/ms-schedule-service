import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { POSTGRES_DATA_SOURCE } from '../config';
import { SpecialtieDTO } from '../core/application/specialtie';
import { ISpecialtieRepository, Specialtie, Status } from '../core/domain';

export class SpecialtieRepository implements ISpecialtieRepository {
  private readonly logger = new Logger(SpecialtieRepository.name);
  constructor(
    @InjectRepository(Specialtie, POSTGRES_DATA_SOURCE)
    private readonly _specialtieRepository: Repository<Specialtie>,
  ) {}

  async ListSpecialties(): Promise<Specialtie[]> {
    return this._specialtieRepository
      .createQueryBuilder('specialtie')
      .getMany();
  }

  async CreateSpecialtie({
    name,
    description,
    cfm,
  }: SpecialtieDTO): Promise<Specialtie> {
    const payload = {
      name,
      description,
      cfm,
      status: Status.ACTIVE,
      created_at: new Date(),
    } as Specialtie;

    this.logger.debug(`Create specialtie: payload: `, payload);

    const specialtie = await this._specialtieRepository.save(
      this._specialtieRepository.create(payload),
    );

    this.logger.debug(`CreatePayment: result: `, specialtie);

    return specialtie;
  }
}
