import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { configProvider } from './app.config.provider';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    FilmsModule,
    OrderModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public/content/afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
})
export class AppModule {}
