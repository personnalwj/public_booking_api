import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/helpers/base.entity';
import { Congregation } from 'src/resources/congregations/entities/congregation.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Property()
  name: string;

  @Property({ unique: true })
  sub: string;

  @ManyToOne('Congregation')
  congregation!: Congregation;
}
