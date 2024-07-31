import { Collection, Entity, ManyToMany, ManyToOne, Property, TextType } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/helpers/base.entity';
import { User } from 'src/resources/users/entities/user.entity';

@Entity()
export class Booking extends CustomBaseEntity {
  @ManyToOne('User')
  user!: string;

  @ManyToMany({ entity: () => User, owner: true })
  companions = new Collection<User>(this);

  @ManyToOne('Spot')
  spot!: string;

  @ManyToOne('TimeSlot')
  timeSlot!: string;

  @Property()
  date: Date;

  @Property({ type: TextType })
  notes: string;
}
