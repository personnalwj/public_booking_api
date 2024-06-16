import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateSpotDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  congregation: UUID;

  @IsNotEmpty()
  @IsArray()
  @IsUUID(undefined, { each: true })
  @ArrayNotEmpty()
  timeSlots: UUID[];
}
