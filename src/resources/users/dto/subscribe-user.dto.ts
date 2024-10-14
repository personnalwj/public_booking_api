import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SubscibeUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  family_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;
}
