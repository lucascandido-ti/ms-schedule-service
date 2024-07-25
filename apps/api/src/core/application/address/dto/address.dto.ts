import { Address } from '@schedule/api/core/domain';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddressDTO {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsNumber()
  @IsNotEmpty()
  zip_code: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  public MapToEntity(dto: AddressDTO): Address {
    const { street, number, neighborhood, zip_code, city, country } = dto;
    return {
      street,
      number,
      neighborhood,
      zip_code,
      city,
      country,
      created_at: new Date(),
      updated_at: new Date(),
    } as Address;
  }

  public MapToDTO(entity: Address): AddressDTO {
    const { street, number, neighborhood, zip_code, city, country } = entity;
    return {
      street,
      number,
      neighborhood,
      zip_code,
      city,
      country,
    } as AddressDTO;
  }
}
