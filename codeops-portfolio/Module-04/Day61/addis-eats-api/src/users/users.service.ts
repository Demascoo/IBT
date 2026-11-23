import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import type { User } from './user.types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async create(
    email: string,
    passwordHash: string,
    roles: string[] = ['customer'],
  ): Promise<User> {
    const newUser: User = {
      id: Date.now(), // Fake ID generation for now
      email,
      passwordHash,
      roles,
    };
    this.users.push(newUser);
    return newUser;
  }
}
