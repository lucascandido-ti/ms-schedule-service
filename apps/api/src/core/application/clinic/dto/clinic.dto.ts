import {
  IsInstance,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import { AddressDTO } from '../../address/dto';
import { SpecialtieDTO } from '../../specialtie';

import {
  Clinic,
  IBussinessHour,
  IContactOptions,
} from '@schedule/api/core/domain';

export class ClinicDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  cnpj_code: string;

  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ValidateNested({ each: true })
  contact: IContactOptions;

  @ValidateNested({ each: true })
  bussiness_hour: IBussinessHour;

  @ValidateNested({ each: true })
  @IsInstance(AddressDTO)
  addresses: AddressDTO[];

  @ValidateNested({ each: true })
  @IsInstance(SpecialtieDTO)
  specialties: SpecialtieDTO[];

  public MapToEntity(dto: ClinicDTO): Clinic {
    const {
      name,
      description,
      cnpj_code,
      company_name,
      contact,
      bussiness_hour,
      addresses,
      specialties,
    } = dto;

    const addressesDto = addresses.map((address) =>
      new AddressDTO().MapToEntity(address),
    );
    const specialtiesDto = specialties.map((specialtie) =>
      new SpecialtieDTO().MapToEntity(specialtie),
    );

    return {
      name,
      description,
      cnpj_code,
      company_name,
      contact,
      bussiness_hour,
      addresses: addressesDto,
      specialties: specialtiesDto,
    } as Clinic;
  }

  public MapToDTO(entity: Clinic): ClinicDTO {
    const {
      name,
      description,
      cnpj_code,
      company_name,
      contact,
      bussiness_hour,
      addresses,
      specialties,
    } = entity;

    const addressesEntity = addresses.map((address) =>
      new AddressDTO().MapToDTO(address),
    );
    const specialtiesEntity = specialties.map((specialtie) =>
      new SpecialtieDTO().MapToDTO(specialtie),
    );

    return {
      name,
      description,
      cnpj_code,
      company_name,
      contact,
      bussiness_hour,
      addresses: addressesEntity,
      specialties: specialtiesEntity,
    } as ClinicDTO;
  }
}
