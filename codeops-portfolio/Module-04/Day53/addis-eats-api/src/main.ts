import {
  Order,
  InMemoryOrderRepository,
  OrderService,
  OrderNotFoundError,
} from './orders';

const orders: Order[] = [
  {
    id: 1,
    customer: 'Eyuel',
    area: 'Bole',
    status: 'PENDING',
    dishes: [
      {
        name: 'Doro Wat',
        priceSantim: 24000,
      },
      {
        name: 'Shiro',
        priceSantim: 12000,
      },
    ],
    phone: '0914554624',
    totalSantim: 36000,
  },
];

const repository = new InMemoryOrderRepository(orders);

const service = new OrderService(repository);

console.log(service.find(1));

console.log(service.feesByArea());

console.log(service.summarise('customer'));

console.log(service.summarise('status'));

try {
  service.find(999);
} catch (err) {
  if (err instanceof OrderNotFoundError) {
    console.log(err.message);
  }
}
