import { Entity, ManyToOne, Property, TextType } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/helpers/base.entity';

@Entity()
export class Booking extends CustomBaseEntity {
  @ManyToOne('User')
  user!: string;

  @ManyToOne('Spot')
  spot!: string;

  @ManyToOne('TimeSlot')
  timeSlot!: string;

  @Property()
  date: Date;

  @Property({ type: TextType })
  notes: string;
}
