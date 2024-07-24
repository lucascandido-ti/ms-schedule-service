import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ApiConfig {
  @IsNumber()
  @Min(3000)
  @Max(3999)
  port: number;

  @IsString()
  @IsNotEmpty()
  prefix: string;
}
