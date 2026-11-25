import type { Order } from './order.types';

export const SEED_ORDERS: Order[] = [
  {
    id: 1,
    customerId: 1, // Almaz
    customer: 'Almaz Bekele',
    area: 'Bole',
    status: 'PENDING',
    phone: '+251911223344',
    totalSantim: 67000,
    dishes: [
      { name: 'Doro Wat', priceSantim: 32000 },
      { name: 'Kitfo', priceSantim: 35000 },
    ],
  },
  {
    id: 2,
    customerId: 1, // Almaz
    customer: 'Dawit Tadesse',
    area: 'Kazanchis',
    status: 'PREPARING',
    totalSantim: 47000,
    dishes: [
      { name: 'Shiro', priceSantim: 18000 },
      { name: 'Tibs', priceSantim: 29000 },
    ],
  },
  {
    id: 3,
    customerId: 1, // Almaz
    customer: 'Sara Haile',
    area: 'Piassa',
    status: 'ON_THE_WAY',
    phone: '+251922334455',
    totalSantim: 36000,
    dishes: [
      { name: 'Beyaynetu', priceSantim: 22000 },
      { name: 'Gomen', priceSantim: 14000 },
    ],
  },
];
