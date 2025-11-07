import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import { FilmDto, FilmScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async getAllFilms(): Promise<FilmDto[]> {
    const films = await this.filmModel.find().exec();
    return films.map(f => ({
      id: f.id,
      title: f.title,
      director: f.director,
      tags: f.tags,
      rating: f.rating,
      about: f.about,
      description: f.description,
      image: f.image,
      cover: f.cover,
    }));
  }

  async getFilmSchedule(filmId: string): Promise<FilmScheduleDto[]> {
    const film = await this.filmModel.findOne({ id: filmId }).exec();
    return film?.schedule.map(s => ({
      id: s.id,
      daytime: s.daytime,
      hall: s.hall.toString(),
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken,
    })) || [];
  }
}
