import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmDto, FilmScheduleDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: jest.Mocked<FilmsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            getAllFilms: jest.fn(),
            getFilmSchedule: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get(FilmsController);
    service = module.get(FilmsService);
  });

  it('возвращает список фильмов', async () => {
    const mockFilms: FilmDto[] = [
      {
        id: '1',
        title: 'Dune',
        director: 'Villeneuve',
        tags: ['fantasy', 'epic'],
        rating: 8.7,
        about: 'Some info',
        description: 'Long description...',
        image: '/img/1.jpg',
        cover: '/cover/1.jpg'
      },
      {
        id: '2',
        title: 'Interstellar',
        director: 'Nolan',
        tags: ['sci-fi'],
        rating: 8.9,
        about: 'Info',
        description: 'Space and stuff',
        image: '/img/2.jpg',
        cover: '/cover/2.jpg'
      }
    ];

    service.getAllFilms.mockResolvedValue(mockFilms);

    const result = await controller.getAllFilms();

    expect(result).toEqual({
      total: 2,
      items: mockFilms
    });

    expect(service.getAllFilms).toHaveBeenCalledTimes(1);
  });

  it('возвращает расписание по id фильма', async () => {
    const mockSchedule: FilmScheduleDto[] = [
      {
        id: 'sch-1',
        daytime: '2025-02-01T18:00:00.000Z',
        hall: 'Main',
        rows: 10,
        seats: 120,
        price: 300,
        taken: ['3-5', '3-6']
      },
      {
        id: 'sch-2',
        daytime: '2025-02-01T21:00:00.000Z',
        hall: 'VIP',
        rows: 5,
        seats: 40,
        price: 500,
        taken: []
      }
    ];

    service.getFilmSchedule.mockResolvedValue(mockSchedule);

    const result = await controller.getFilmSchedule('1');

    expect(result).toEqual({
      total: 2,
      items: mockSchedule
    });

    expect(service.getFilmSchedule).toHaveBeenCalledWith('1');
  });
});
