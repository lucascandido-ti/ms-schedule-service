import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { SpecialtieDTO } from '../core/application/specialtie';
import { ISpecialtieRepository, Specialtie, Status } from '../core/domain';
import { Logger } from '@nestjs/common';
import { POSTGRES_DATA_SOURCE } from '../config';

export class SpecialtieRepository implements ISpecialtieRepository {
  private readonly logger = new Logger(SpecialtieRepository.name);
  constructor(
    @InjectRepository(Specialtie, POSTGRES_DATA_SOURCE)
    private readonly _specialtieRepository: Repository<Specialtie>,
  ) {}

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
