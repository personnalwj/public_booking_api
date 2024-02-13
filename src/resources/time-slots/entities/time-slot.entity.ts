import { Entity, Property, TimeType } from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/helpers/base.entity';

@Entity()
export class TimeSlot extends CustomBaseEntity {
  @Property({ type: TimeType, nullable: false })
  startTime: string;

  @Property({ type: TimeType, nullable: false })
  endTime: string;
}
