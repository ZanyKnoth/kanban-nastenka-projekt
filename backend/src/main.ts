import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

async function bootstrap(): Promise<any> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN')?.split(",").map(origin => origin.trim()) || '*'
  });

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}

bootstrap();