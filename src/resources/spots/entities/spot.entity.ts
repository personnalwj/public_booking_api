import {
  Collection,
  Entity,
  ManyToMany,
  Property,
  TextType,
} from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/helpers/base.entity';
import { TimeSlot } from 'src/resources/time-slots/entities/time-slot.entity';

@Entity()
export class Spot extends CustomBaseEntity {
  @Property()
  title: string;

  @Property()
  address: string;

  @Property({ type: TextType })
  description: string;

  @ManyToMany({ entity: () => TimeSlot, owner: true })
  timeSlots = new Collection<TimeSlot>(this);
}
