import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Film, FilmSchema } from '../films/schemas/film.schema';
import { Film as FilmEntity } from '../entity/film.entity';
import { Schedule } from '../entity/schedule.entity';
import { TypeOrmOrderRepository } from '../repository/order.repository';

@Module({
  imports: [
    // PostgreSQL
    TypeOrmModule.forFeature([FilmEntity, Schedule]),
    
    // MongoDB
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, TypeOrmOrderRepository],
  exports: [TypeOrmOrderRepository, MongooseModule],
})
export class OrderModule {}
