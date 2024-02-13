import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';

export default {
  entities: ['./dist/**/entities/*.entity.js'],
  entitiesTs: ['./src/**/entities/*'],
  driver: PostgreSqlDriver,
  dbName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  debug: process.env.NODE_ENV === 'development',
  extensions: [Migrator],
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './dist/src/database/migrations', // path to the folder with migrations
    pathTs: './src/database/migrations', // path to the folder with TS migrations (if used, you should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts' as const, // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
};
