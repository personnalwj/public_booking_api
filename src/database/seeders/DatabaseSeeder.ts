import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { SpotFactory } from '../factories/spot.factory';
import { UserFactory } from '../factories/user.factory';
import { CongregationFactory } from '../factories/congregation.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new CongregationFactory(em)
      .each((congregation) => {
        congregation.members.set(new UserFactory(em).make(20));
        congregation.spots.set(new SpotFactory(em).make(20));
        congregation.responsible = new UserFactory(em).makeOne({
          congregation,
        });
      })
      .make(3);
    em.flush();
  }
}
