import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Film } from '../entity/film.entity';
import { Schedule } from '../entity/schedule.entity';
import { OrderDto, OrderResponseDto } from '../order/dto/order.dto';

export interface OrderRepository {
  createOrder(order: OrderDto): Promise<OrderResponseDto[]>;
}

@Injectable()
export class TypeOrmOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async createOrder(order: OrderDto): Promise<OrderResponseDto[]> {
    const responses: OrderResponseDto[] = [];

    for (const ticket of order.tickets) {
      const film = await this.filmRepo.findOne({ 
        where: { id: ticket.film },
        relations: ['schedule']
      });
      if (!film) throw new BadRequestException(`Film ${ticket.film} not found`);

      const session = film.schedule.find(s => s.id === ticket.session);
      if (!session) throw new BadRequestException(`Session ${ticket.session} not found`);

      const takenSeats = session.taken ? session.taken.split(',') : [];
      const seatId = `${ticket.row}:${ticket.seat}`;
      if (takenSeats.includes(seatId)) {
        throw new BadRequestException(`Seat ${seatId} is already taken`);
      }

      takenSeats.push(seatId);
      session.taken = takenSeats.join(',');
      await this.scheduleRepo.save(session);

      responses.push({ ...ticket, id: uuidv4() });
    }

    return responses;
  }
}