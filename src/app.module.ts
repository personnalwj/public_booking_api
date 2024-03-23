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
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthzModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
    SpotsModule,
    UsersModule,
    BookingsModule,
    TimeSlotsModule,
    CongregationsModule,
    AuthModule.forRoot({
      connectionURI:
        process.env.SUPERTOKENS_CONNECTION_URI || 'https://try.supertokens.com',
      appInfo: {
        appName: process.env.SUPERTOKENS_APPNAME || 'local',
        apiDomain:
          process.env.SUPERTOKENS_API_DOMAIN || 'http://localhost:3000',
        websiteDomain:
          process.env.SUPERTOKENS_WEBSITE_DOMAIN || 'http://localhost:3000',
        apiBasePath: process.env.SUPERTOKENS_API_BASEPATH || '/back-api',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
