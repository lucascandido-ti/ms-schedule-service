import {
  IsInstance,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ClinicDTO } from '../../clinic';
import { ScheduleDTO } from '../../schedule';
import { SpecialtieDTO } from '../../specialtie';

import { Doctor, IServiceOptions } from '@schedule/api/core/domain';

export class DoctorDTO {
  @IsString()
  name: string;

  @IsString()
  user_id: string;

  @IsString()
  last_name: string;

  @IsString()
  email: string;

  @IsNumber()
  crm_code: number;

  @ValidateNested({ each: true })
  service_options: IServiceOptions;

  @ValidateNested({ each: true })
  @IsInstance(ScheduleDTO)
  schedules: ScheduleDTO[];

  @ValidateNested({ each: true })
  @IsInstance(SpecialtieDTO)
  specialties: SpecialtieDTO[];

  @ValidateNested({ each: true })
  @IsInstance(ClinicDTO)
  clinics: ClinicDTO[];

  public MapToEntity(dto: DoctorDTO): Doctor {
    const {
      name,
      user_id,
      last_name,
      email,
      crm_code,
      service_options,
      schedules,
      specialties,
      clinics,
    } = dto;

    const scheduleEntity = schedules.map((schedule) =>
      new ScheduleDTO().MapToEntity(schedule),
    );

    const specialtieEntity = specialties.map((specialtie) =>
      new SpecialtieDTO().MapToEntity(specialtie),
    );

    const clinicEntity = clinics.map((clinic) =>
      new ClinicDTO().MapToEntity(clinic),
    );

    return {
      name,
      user_id,
      last_name,
      email,
      crm_code,
      service_options,
      schedules: scheduleEntity,
      specialties: specialtieEntity,
      clinics: clinicEntity,
    } as Doctor;
  }

  public MapToDTO(entity: Doctor): DoctorDTO {
    const {
      name,
      last_name,
      email,
      crm_code,
      service_options,
      specialties,
      clinics,
    } = entity;

    const specialtieDTO = specialties.map((specialtie) =>
      new SpecialtieDTO().MapToDTO(specialtie),
    );

    const clinicDTO = clinics.map((clinic) => new ClinicDTO().MapToDTO(clinic));

    return {
      name,
      last_name,
      email,
      crm_code,
      service_options,
      specialties: specialtieDTO,
      clinics: clinicDTO,
    } as DoctorDTO;
  }
}
