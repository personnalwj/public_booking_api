import { Migration } from '@mikro-orm/migrations';

export class Migration20240422203855 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "congregation" drop constraint "congregation_responsible_id_foreign";');

    this.addSql('alter table "congregation" alter column "responsible_id" drop default;');
    this.addSql('alter table "congregation" alter column "responsible_id" type uuid using ("responsible_id"::text::uuid);');
    this.addSql('alter table "congregation" alter column "responsible_id" drop not null;');
    this.addSql('alter table "congregation" add constraint "congregation_responsible_id_foreign" foreign key ("responsible_id") references "user" ("id") on update cascade on delete set null;');

    this.addSql('alter table "user" drop column "name";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "congregation" drop constraint "congregation_responsible_id_foreign";');

    this.addSql('alter table "user" add column "name" varchar(255) not null;');

    this.addSql('alter table "congregation" alter column "responsible_id" drop default;');
    this.addSql('alter table "congregation" alter column "responsible_id" type uuid using ("responsible_id"::text::uuid);');
    this.addSql('alter table "congregation" alter column "responsible_id" set not null;');
    this.addSql('alter table "congregation" add constraint "congregation_responsible_id_foreign" foreign key ("responsible_id") references "user" ("id") on update cascade;');
  }

}
