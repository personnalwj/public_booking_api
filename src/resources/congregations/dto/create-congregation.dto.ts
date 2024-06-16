import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCongregationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  responsible_family_name: string;

  @IsNotEmpty()
  @IsString()
  responsible_given_name: string;

  @IsString()
  description: string;
}
