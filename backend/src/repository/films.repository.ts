import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entity/film.entity';
import { FilmDto, FilmScheduleDto } from '../films/dto/films.dto';

export interface FilmsRepository {
  findAll(): Promise<FilmDto[]>;
  findSchedule(filmId: string): Promise<FilmScheduleDto[]>;
}

@Injectable()
export class TypeOrmFilmsRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly repo: Repository<Film>,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    const films = await this.repo.find();
    return films.map(f => ({
      id: f.id,
      title: f.title,
      director: f.director,
      tags: f.tags.split(','),
      rating: f.rating,
      about: f.about,
      description: f.description,
      image: f.image,
      cover: f.cover,
    }));
  }

  async findSchedule(filmId: string): Promise<FilmScheduleDto[]> {
    const film = await this.repo.findOne({ 
      where: { id: filmId }, 
      relations: ['schedule'] 
    });
    if (!film) return [];

    return film.schedule.map(s => ({
      id: s.id,
      daytime: s.daytime,
      hall: s.hall.toString(),
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken ? s.taken.split(',') : [],
    }));
  }
}
