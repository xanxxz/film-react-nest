import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Film, FilmDocument } from '../films/schemas/film.schema';
import { OrderDto, OrderResponseDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async createOrder(order: OrderDto): Promise<OrderResponseDto[]> {
    const responses: OrderResponseDto[] = [];

    for (const ticket of order.tickets) {
      const film = await this.filmModel.findOne({ id: ticket.film });
      if (!film) throw new BadRequestException(`Film ${ticket.film} not found`);

      const session = film.schedule.find(s => s.id === ticket.session);
      if (!session) throw new BadRequestException(`Session ${ticket.session} not found`);

      const seatId = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(seatId)) {
        throw new BadRequestException(`Seat ${seatId} is already taken`);
      }

      session.taken.push(seatId);
      await film.save();

      responses.push({
        ...ticket,
        id: uuidv4(),
      });
    }

    return responses;
  }
}
