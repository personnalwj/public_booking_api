import { MikroORM } from '@mikro-orm/core';
import { TimeSlotSeeder } from 'src/database/seeders/TimeSlotSeeder';

import mikroOrmConfig from 'mikro-orm.config';

(async () => {
  console.log('Seeding database...');
  const orm = await MikroORM.init(mikroOrmConfig);
  const seeder = orm.getSeeder();
  const timeSlotRepository = orm.em.fork().getRepository('TimeSlot');
  const timeSlots = await timeSlotRepository.findAll();

  // Refresh the database to start clean (work in mongo too since v5)
  if (timeSlots.length === 0) {
    await seeder.seed(TimeSlotSeeder);
  }
  // Seed using a seeder defined by you
  await orm.close(true);
})();
