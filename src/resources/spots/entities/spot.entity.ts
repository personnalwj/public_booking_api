import { Entity, Property, TextType } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/helpers/base.entity';

@Entity()
export class Spot extends CustomBaseEntity {
  @Property()
  title: string;

  @Property()
  address: string;

  @Property({ type: TextType })
  description: string;
}
