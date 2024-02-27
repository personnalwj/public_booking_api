import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { SpotFactory } from '../factories/spot.factory';
import { UserFactory } from '../factories/user.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new SpotFactory(em).make(10000);
    new UserFactory(em).make(10000);
  }
}
