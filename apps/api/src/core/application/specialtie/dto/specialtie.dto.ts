import { IsNotEmpty, IsString } from 'class-validator';

import { Specialtie } from '@schedule/api/core/domain';

export class SpecialtieDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  cfm: string;

  public MapToEntity(dto: SpecialtieDTO): Specialtie {
    const { name, description, cfm } = dto;
    return {
      name,
      description,
      cfm,
      created_at: new Date(),
      updated_at: new Date(),
    } as Specialtie;
  }

  public MapToDTO(entity: Specialtie): SpecialtieDTO {
    const { name, description, cfm } = entity;
    return {
      name,
      description,
      cfm,
    } as SpecialtieDTO;
  }
}
