import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import { ValidationPipe } from '@nestjs/common';
import { AuthzGuard } from './authz/guards/authz.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('back-api');
  app.enableCors({
    origin: [
      process.env.FRONTEND_DOMAIN,
      process.env.SUPERTOKENS_WEBSITE_DOMAIN,
      'http://public-booking.front.localhost',
      'http://localhost:3003',
    ],
    // allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  // app.useGlobalGuards(new AuthzGuard());
  app.useGlobalFilters(new SupertokensExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
