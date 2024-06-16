import { Migration } from '@mikro-orm/migrations';

export class Migration20240526095941 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "time_slot" ("id" uuid not null default gen_random_uuid(), "created_at" date not null, "updated_at" date not null, "start_time" time(0) not null, "end_time" time(0) not null, constraint "time_slot_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "congregation" ("id" uuid not null default gen_random_uuid(), "created_at" date not null, "updated_at" date not null, "name" varchar(255) not null, "address" varchar(255) not null, "responsible_id" uuid null, "description" text null, constraint "congregation_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "congregation" add constraint "congregation_responsible_id_unique" unique ("responsible_id");',
    );

    this.addSql(
      'create table "user" ("id" uuid not null default gen_random_uuid(), "created_at" date not null, "updated_at" date not null, "sub" varchar(255) not null, "email" varchar(255) not null, "given_name" varchar(255) not null, "family_name" varchar(255) not null, "congregation_id" uuid not null, constraint "user_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "user" add constraint "user_sub_unique" unique ("sub");',
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");',
    );

    this.addSql(
      'create table "spot" ("id" uuid not null default gen_random_uuid(), "created_at" date not null, "updated_at" date not null, "title" varchar(255) not null, "address" varchar(255) not null, "description" text null, "congregation_id" uuid not null, constraint "spot_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "spot_time_slots" ("spot_id" uuid not null, "time_slot_id" uuid not null, constraint "spot_time_slots_pkey" primary key ("spot_id", "time_slot_id"));',
    );

    this.addSql(
      'create table "booking" ("id" uuid not null default gen_random_uuid(), "created_at" date not null, "updated_at" date not null, "user_id" uuid not null, "spot_id" uuid not null, "time_slot_id" uuid not null, "date" timestamptz not null, "notes" text not null, constraint "booking_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "congregation" add constraint "congregation_responsible_id_foreign" foreign key ("responsible_id") references "user" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "user" add constraint "user_congregation_id_foreign" foreign key ("congregation_id") references "congregation" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "spot" add constraint "spot_congregation_id_foreign" foreign key ("congregation_id") references "congregation" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "spot_time_slots" add constraint "spot_time_slots_spot_id_foreign" foreign key ("spot_id") references "spot" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "spot_time_slots" add constraint "spot_time_slots_time_slot_id_foreign" foreign key ("time_slot_id") references "time_slot" ("id") on update cascade on delete cascade;',
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

  async down(): Promise<void> {
    this.addSql(
      'alter table "spot_time_slots" drop constraint "spot_time_slots_time_slot_id_foreign";',
    );

    this.addSql(
      'alter table "booking" drop constraint "booking_time_slot_id_foreign";',
    );

    this.addSql(
      'alter table "user" drop constraint "user_congregation_id_foreign";',
    );

    this.addSql(
      'alter table "spot" drop constraint "spot_congregation_id_foreign";',
    );

    this.addSql(
      'alter table "congregation" drop constraint "congregation_responsible_id_foreign";',
    );

    this.addSql(
      'alter table "booking" drop constraint "booking_user_id_foreign";',
    );

    this.addSql(
      'alter table "spot_time_slots" drop constraint "spot_time_slots_spot_id_foreign";',
    );

    this.addSql(
      'alter table "booking" drop constraint "booking_spot_id_foreign";',
    );

    this.addSql('drop table if exists "time_slot" cascade;');

    this.addSql('drop table if exists "congregation" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "spot" cascade;');

    this.addSql('drop table if exists "spot_time_slots" cascade;');

    this.addSql('drop table if exists "booking" cascade;');
  }
}
