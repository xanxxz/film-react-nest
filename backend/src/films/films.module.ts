import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { MongooseModule } from '@nestjs/mongoose';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
//import { Film, FilmSchema } from './schemas/film.schema';
import { Film as FilmEntity } from '../entity/film.entity';
import { Schedule } from '../entity/schedule.entity';
import { TypeOrmFilmsRepository } from '../repository/films.repository';

@Module({
  imports: [
    // PostgreSQL
    TypeOrmModule.forFeature([FilmEntity, Schedule]),
    
    // MongoDB
    //MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, TypeOrmFilmsRepository],
  exports: [TypeOrmFilmsRepository],
})
export class FilmsModule {}
