export interface User {
  readonly id: number;
  email: string;
  passwordHash: string;
  roles: string[];
}
