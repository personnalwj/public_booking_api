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

@Module({
  imports: [
    // ConfigModule.forRoot(),
    AuthzModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
    SpotsModule,
    UsersModule,
    BookingsModule,
    TimeSlotsModule,
    CongregationsModule,
    KindeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BodyParserMiddleware)
      .forRoutes('spots', 'users', 'bookings', 'time-slots', 'congregations');
  }
}
