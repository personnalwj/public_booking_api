import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/helpers/base.entity';
import { User } from 'src/resources/users/entities/user.entity';

@Entity()
export class Congregation extends CustomBaseEntity {
  @Property()
  name: string;

  @Property()
  address: string;

  @OneToOne()
  responsible!: User;
}
