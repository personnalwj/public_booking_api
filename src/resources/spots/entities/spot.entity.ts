import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
  TextType,
} from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/helpers/base.entity';
import { Congregation } from 'src/resources/congregations/entities/congregation.entity';
import { TimeSlot } from 'src/resources/time-slots/entities/time-slot.entity';

@Entity()
export class Spot extends CustomBaseEntity {
  @Property()
  title: string;

  @Property()
  address: string;

  @Property({ type: TextType, nullable: true })
  description: string;

  @ManyToMany({ entity: () => TimeSlot, owner: true })
  timeSlots = new Collection<TimeSlot>(this);

  @ManyToOne('Congregation')
  congregation!: Congregation;
}
