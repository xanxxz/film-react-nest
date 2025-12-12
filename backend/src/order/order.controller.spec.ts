import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: jest.Mocked<OrderService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get(OrderController);
    service = module.get(OrderService);
  });

  it('создаёт новый заказ', async () => {
    const dto: OrderDto = {
      email: 'test@example.com',
      phone: '+79001234567',
      tickets: [
        {
          film: 'Film 1',
          session: 'session-123',
          daytime: '2025-02-01T18:00:00.000Z',
          row: 3,
          seat: 5,
          price: 300
        }
      ]
    };

    const mockResponse = [
      {
        id: 'ticket-999',
        film: 'Film 1',
        session: 'session-123',
        daytime: '2025-02-01T18:00:00.000Z',
        row: 3,
        seat: 5,
        price: 300
      }
    ];

    service.createOrder.mockResolvedValue(mockResponse);

    const result = await controller.createOrder(dto);

    expect(result).toEqual(mockResponse);
    expect(service.createOrder).toHaveBeenCalledWith(dto);
  });
});
