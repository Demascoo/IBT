export const AREAS = ['Bole', 'Kazanchis', 'Piassa', 'Megenagna'] as const;
export type Area = (typeof AREAS)[number];

export type OrderStatus =
  'PENDING' | 'PREPARING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';

export type Dish = {
  name: string;
  priceSantim: number;
};

export type Order = {
  readonly id: number;
  customerId: number; // <--- Required for Day 62
  customer: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  phone?: string;
  totalSantim: number;
};
