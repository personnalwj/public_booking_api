import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from 'mikro-orm.config';

(async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  const migrator = orm.getMigrator();

  const migrationNeeded = await migrator.checkMigrationNeeded();
  if (migrationNeeded) {
    console.log('Migrations are pending. Running migrations...');
    await migrator.up();
  }
  console.log('Migrations are up to date.');
  await orm.close(true);
})();
