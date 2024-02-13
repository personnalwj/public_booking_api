import { Migration } from '@mikro-orm/migrations';

export class Migration20240213004951 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "spot" ("id" uuid not null default gen_random_uuid(), "created_at" date not null, "updated_at" date not null, "title" varchar(255) not null, "address" varchar(255) not null, "description" text not null, constraint "spot_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "time_slot" ("id" uuid not null default gen_random_uuid(), "created_at" date not null, "updated_at" date not null, "start_time" time(0) not null, "end_time" time(0) not null, constraint "time_slot_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "user" ("id" uuid not null default gen_random_uuid(), "created_at" date not null, "updated_at" date not null, "name" varchar(255) not null, "sub" varchar(255) not null, constraint "user_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "user" add constraint "user_sub_unique" unique ("sub");',
    );

    this.addSql(
      'create table "booking" ("id" uuid not null default gen_random_uuid(), "created_at" date not null, "updated_at" date not null, "user_id" uuid not null, "spot_id" uuid not null, "time_slot_id" uuid not null, "date" timestamptz not null, "notes" text not null, constraint "booking_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "booking" add constraint "booking_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "booking" add constraint "booking_spot_id_foreign" foreign key ("spot_id") references "spot" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "booking" add constraint "booking_time_slot_id_foreign" foreign key ("time_slot_id") references "time_slot" ("id") on update cascade;',
    );
  }
}
