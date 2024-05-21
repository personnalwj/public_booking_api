import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
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
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
