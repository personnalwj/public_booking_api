import { UUID } from 'crypto';

export class CreateUserDto {
  sub: string;
  congregation: UUID;
}
