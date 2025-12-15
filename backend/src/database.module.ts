import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Film } from './entity/film.entity';
import { Schedule } from './entity/schedule.entity';
import { Film as FilmMongo, FilmSchema } from './films/schemas/film.schema';

@Module({
  imports: [
    ConfigModule,

    // PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        if (config.get('DATABASE_DRIVER') !== 'postgres') return {};
        return {
          type: 'postgres',
          host: config.get('DATABASE_HOST'),
          port: config.get<number>('DATABASE_PORT'),
          username: config.get('DATABASE_USERNAME'),
          password: config.get('DATABASE_PASSWORD'),
          database: config.get('DATABASE_NAME'),
          entities: [Film, Schedule],
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([Film, Schedule]),


    //MongooseModule.forRootAsync({
      //imports: [ConfigModule],
      //inject: [ConfigService],
      //useFactory: (config: ConfigService) => {
        //if (config.get('DATABASE_DRIVER') !== 'mongodb') 
          //return { uri: config.get('DATABASE_URL') };
      //},
    //}),
    //MongooseModule.forFeature([{ name: FilmMongo.name, schema: FilmSchema }]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
