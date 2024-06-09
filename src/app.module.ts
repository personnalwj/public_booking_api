import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SpotsModule } from './resources/spots/spots.module';
import { UsersModule } from './resources/users/users.module';
import { BookingsModule } from './resources/bookings/bookings.module';
import { TimeSlotsModule } from './resources/time-slots/time-slots.module';
import { CongregationsModule } from './resources/congregations/congregations.module';
import mikroOrmConfig from './../mikro-orm.config';
import { AuthzModule } from './authz/authz.module';
import { KindeModule } from './services/kinde/kinde.module';
import { BodyParserMiddleware } from './middlewares/body-parser.middleware';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),

    //services
    KindeModule,

    // resources
    SpotsModule,
    UsersModule,
    BookingsModule,
    TimeSlotsModule,
    CongregationsModule,

    // tools
    AuthzModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
