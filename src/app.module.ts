import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {} from 'nest-keycloak-connect';
import { AuthzModule } from './authz/authz.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SpotsModule } from './resources/spots/spots.module';
import { UsersModule } from './resources/users/users.module';
import { BookingsModule } from './resources/bookings/bookings.module';
import { TimeSlotsModule } from './resources/time-slots/time-slots.module';
import { CongregationsModule } from './resources/congregations/congregations.module';
import mikroOrmConfig from './../mikro-orm.config';

@Module({
  imports: [
    AuthzModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
    SpotsModule,
    UsersModule,
    BookingsModule,
    TimeSlotsModule,
    CongregationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
