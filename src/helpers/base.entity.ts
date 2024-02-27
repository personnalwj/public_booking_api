import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import crypto from 'crypto';

@Entity({ abstract: true })
export abstract class CustomBaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id = crypto.randomUUID();

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
}
