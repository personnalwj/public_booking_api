import { Migration } from '@mikro-orm/migrations';

export class Migration20240406212150_add_relation_spot_congregation extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "spot" add column "congregation_id" uuid not null;',
    );
    this.addSql(
      'alter table "spot" add constraint "spot_congregation_id_foreign" foreign key ("congregation_id") references "congregation" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "spot" drop constraint "spot_congregation_id_foreign";',
    );

    this.addSql('alter table "spot" drop column "congregation_id";');
  }
}
