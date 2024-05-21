import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/helpers/base.entity';
import { Congregation } from 'src/resources/congregations/entities/congregation.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Property({ unique: true })
  sub: string;

  @Property({ unique: true })
  email: string;

  @Property()
  given_name: string;

  @Property()
  family_name: string;

  @ManyToOne('Congregation')
  congregation!: Congregation;
}
