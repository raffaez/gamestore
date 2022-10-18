import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'; //set timezone to BRT

  app.useGlobalPipes(new ValidationPipe()); //use class-validator in all requests
  app.enableCors(); //allows external requests

  const port = 4000;
  await app.listen(port);
}
bootstrap();
