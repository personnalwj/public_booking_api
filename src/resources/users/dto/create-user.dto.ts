import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  sub: UUID;

  @IsUUID()
  @IsNotEmpty()
  congregation: UUID;
}
