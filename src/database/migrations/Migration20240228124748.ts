import { Migration } from '@mikro-orm/migrations';

export class Migration20240228124748 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "spot_time_slots" ("spot_id" uuid not null, "time_slot_id" uuid not null, constraint "spot_time_slots_pkey" primary key ("spot_id", "time_slot_id"));',
    );

    this.addSql(
      'alter table "spot_time_slots" add constraint "spot_time_slots_spot_id_foreign" foreign key ("spot_id") references "spot" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "spot_time_slots" add constraint "spot_time_slots_time_slot_id_foreign" foreign key ("time_slot_id") references "time_slot" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "spot_time_slots" cascade;');
  }
}
