import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips unwanted properties
      forbidNonWhitelisted: true, // Throws an error if extra properties are provided
      transform: true, // Automatically transform payloads to DTO classes
    }),
  );

  await app.listen(3000);
}
bootstrap();
