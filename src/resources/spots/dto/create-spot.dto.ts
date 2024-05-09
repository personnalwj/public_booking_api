import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateSpotDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  congregation: UUID;

  @IsNotEmpty()
  timeSlots: UUID[];
}
