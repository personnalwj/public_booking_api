import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {} from 'nest-keycloak-connect';
import { SpotsModule } from './spots/spots.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [SpotsModule, AuthzModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
