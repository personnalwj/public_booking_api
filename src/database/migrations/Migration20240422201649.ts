import { Migration } from '@mikro-orm/migrations';

export class Migration20240422201649 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "congregation" drop constraint "congregation_responsible_id_foreign";',
    );

    this.addSql(
      'alter table "congregation" alter column "responsible_id" drop default;',
    );
    this.addSql(
      'alter table "congregation" alter column "responsible_id" type uuid using ("responsible_id"::text::uuid);',
    );
    this.addSql(
      'alter table "congregation" alter column "responsible_id" drop not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "congregation" drop constraint "congregation_responsible_id_foreign";',
    );

    this.addSql(
      'alter table "congregation" alter column "responsible_id" drop default;',
    );
    this.addSql(
      'alter table "congregation" alter column "responsible_id" type uuid using ("responsible_id"::text::uuid);',
    );
    this.addSql(
      'alter table "congregation" alter column "responsible_id" set not null;',
    );
  }
}
