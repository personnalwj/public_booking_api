import { Migration } from '@mikro-orm/migrations';

export class Migration20240626204139 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "booking_companions" ("booking_id" uuid not null, "user_id" uuid not null, constraint "booking_companions_pkey" primary key ("booking_id", "user_id"));');

    this.addSql('alter table "booking_companions" add constraint "booking_companions_booking_id_foreign" foreign key ("booking_id") references "booking" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "booking_companions" add constraint "booking_companions_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "booking_companions" cascade;');
  }

}
