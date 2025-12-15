import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TskvLogger } from './logger/tskv.logger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new TskvLogger()
  });

  app.setGlobalPrefix("api/afisha");
  app.enableCors();

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
