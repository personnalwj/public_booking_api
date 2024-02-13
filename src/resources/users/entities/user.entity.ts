import { Entity, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/helpers/base.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Property()
  name: string;

  @Property({ unique: true })
  sub: string;
}
