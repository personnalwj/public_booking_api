import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCongregationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsString()
  description: string;
}
