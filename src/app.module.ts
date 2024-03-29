import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {} from 'nest-keycloak-connect';
// import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SpotsModule } from './resources/spots/spots.module';
import { UsersModule } from './resources/users/users.module';
import { BookingsModule } from './resources/bookings/bookings.module';
import { TimeSlotsModule } from './resources/time-slots/time-slots.module';
// import mikroOrmConfig from './../mikro-orm.config';

@Module({
  imports: [
    // MikroOrmModule.forRoot(mikroOrmConfig),
    SpotsModule,
    UsersModule,
    BookingsModule,
    TimeSlotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
