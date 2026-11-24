export type Role = 'customer' | 'courier' | 'restaurant' | 'staff';

export interface User {
  readonly id: number;
  email: string;
  passwordHash: string;
  roles: Role[];
}
