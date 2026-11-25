import { Injectable } from '@nestjs/common';
import type { User, Role } from './user.types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  private nextId = 1; // <--- Start IDs at 1

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async create(
    email: string,
    passwordHash: string,
    roles: Role[] = ['customer'],
  ): Promise<User> {
    // TEMPORARY CHEAT for Day 62 testing: If email is staff, give them staff role
    const assignedRoles = email === 'staff@test.com' ? ['staff'] : roles;

    const newUser: User = {
      id: this.nextId++,
      email,
      passwordHash,
      roles: assignedRoles as Role[],
    };
    this.users.push(newUser);
    return newUser;
  }
}
