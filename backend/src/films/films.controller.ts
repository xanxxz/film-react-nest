import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDto, FilmScheduleDto } from './dto/films.dto';

type ApiListResponse<Type> = {
  total: number;
  items: Type[];
};

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<ApiListResponse<FilmDto>> {
    const items = await this.filmsService.getAllFilms();
    return {
      total: items.length,
      items,
    };
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string): Promise<ApiListResponse<FilmScheduleDto>> {
    const items = await this.filmsService.getFilmSchedule(id);
    return {
      total: items.length,
      items,
    };
  }
}
