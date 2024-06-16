import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Property,
  TextType,
} from '@mikro-orm/core';
import { CustomBaseEntity } from 'src/helpers/base.entity';
import { Spot } from 'src/resources/spots/entities/spot.entity';
import { User } from 'src/resources/users/entities/user.entity';

@Entity()
export class Congregation extends CustomBaseEntity {
  @Property()
  name: string;

  @Property()
  address: string;

  @OneToOne({
    entity: () => User,
    nullable: true,
  })
  responsible?: User;

  @Property({ nullable: true, type: TextType })
  description: string;

  @OneToMany({ entity: () => Spot, mappedBy: 'congregation' })
  spots = new Collection<Spot>(this);

  @OneToMany({
    entity: () => User,
    mappedBy: 'congregation',
    orphanRemoval: true,
  })
  members = new Collection<User>(this);
}
