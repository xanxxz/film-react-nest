export class FilmDto {
  id: string;
  title: string;
  director: string;
  tags: string[];
  rating: number;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export class FilmScheduleDto {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}
