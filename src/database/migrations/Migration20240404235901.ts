import { Migration } from '@mikro-orm/migrations';

export class Migration20240404235901 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "congregation" ("id" uuid not null default gen_random_uuid(), "created_at" date not null, "updated_at" date not null, "name" varchar(255) not null, "address" varchar(255) not null, "responsible_id" uuid not null, constraint "congregation_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "congregation" add constraint "congregation_responsible_id_unique" unique ("responsible_id");',
    );

    this.addSql(
      'alter table "congregation" add constraint "congregation_responsible_id_foreign" foreign key ("responsible_id") references "user" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "user" add column "congregation_id" uuid not null;',
    );
    this.addSql(
      'alter table "user" add constraint "user_congregation_id_foreign" foreign key ("congregation_id") references "congregation" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user" drop constraint "user_congregation_id_foreign";',
    );

    this.addSql('drop table if exists "congregation" cascade;');

    this.addSql('alter table "user" drop column "congregation_id";');
  }
}
