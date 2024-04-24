import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsUUID()
  @IsNotEmpty()
  sub: UUID;

  @IsUUID()
  @IsNotEmpty()
  congregation: UUID;
}
